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
                    console.log(images);
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
                    return null;
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
