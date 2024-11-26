import { Navigate, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DefaultLayout from "./layouts/DefaultLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import ManagePostsPage from "./pages/admin/ManagePostsPage/ManagePostsPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import ManageProfiles from "./pages/admin/ManageProfiles";
import LZString from "lz-string";

const BASE_URL = "https://hoteloffers.ge/api/";

export default createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "",
                element: <LandingPage />,
                loader: async () => {
                    const res = await fetch(`${BASE_URL}?cityGEO=*`);
                    const {
                        result: { images },
                    } = await res.json();
                    const decompressedMetadataImages = images.map((image) => ({
                        ...image,
                        meta: {
                            ...image.meta,
                            data: undefined,
                            ...JSON.parse(LZString.decompressFromUTF16(image.meta.data)),
                        },
                    }));
                    const data = {
                        bannerImages: decompressedMetadataImages.filter((image) => image.meta.banner),
                        imagesByCities: decompressedMetadataImages.reduce((acc, currentValue) => {
                            const city = currentValue.meta.cityGEO;
                            if (currentValue.meta.english) {
                                const cityENG = currentValue.meta.cityENG;
                                if (!acc[cityENG]) {
                                    acc[cityENG] = [];
                                }
                                acc[cityENG].push(currentValue);
                            }
                            if (!acc[city]) {
                                acc[city] = [];
                            }
                            acc[city].push(currentValue);
                            return acc;
                        }, {}),
                    };
                    return data;
                },
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="analytics" />,
            },
            {
                path: "posts",
                element: <ManagePostsPage />,
                loader: async () => {
                    // Fetch without Authorization header to trigger the popup
                    const response = await fetch("https://hoteloffers.ge/adminapi/?cityGEO=*", {
                        credentials: "include",
                    });

                    if (!response.ok) {
                        // The browser will display the authentication dialog if a 401 status is returned
                        throw new Error("Authentication required or failed to fetch posts.");
                    }

                    const data = await response.json();
                    const resources = data.result.images;
                    const enrichedPosts = resources.map((resource) => ({
                        id: resource.id,
                        created_at: resource.uploaded,
                        metadata:
                            {
                                cityGEO: resource.meta.cityGEO,
                                ...JSON.parse(LZString.decompressFromUTF16(resource.meta.data)),
                            } || {},
                        status: resource.status,
                    }));

                    return enrichedPosts;
                },
            },
            {
                path: "profiles",
                element: <ManageProfiles />,
                loader: async () => {
                    return null;
                },
            },
            {
                path: "analytics",
                element: <AnalyticsPage />,
                loader: async () => {
                    return null;
                },
            },
        ],
    },
]);
