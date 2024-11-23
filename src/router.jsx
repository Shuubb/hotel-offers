import { Navigate, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DefaultLayout from "./layouts/DefaultLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import ManagePostsPage from "./pages/admin/ManagePostsPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import ManageProfiles from "./pages/admin/ManageProfiles";
import { expression } from "@cloudinary/url-gen/qualifiers/expression";

export default createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "",
                element: <LandingPage />,
                loader: async () => {
                    const fetchBanners = async () => {
                        const res = await fetch("https://cloudinaryapi.shubitidzed9.workers.dev/resources/search", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ expression: `tags=banner-"true"` }),
                        });
                        const { resources } = await res.json();
                        return resources.map((resource) => resource.public_id);
                    };

                    const fetchCities = async () => {
                        const res = await fetch(
                            "https://cloudinaryapi.shubitidzed9.workers.dev/tags/image?prefix=cityGEO-"
                        );
                        const { tags } = await res.json();
                        const cityData = {};

                        await Promise.all(
                            tags.map(async (tag) => {
                                const city = tag.split("-")[1];

                                const res = await fetch(
                                    "https://cloudinaryapi.shubitidzed9.workers.dev/resources/search",
                                    {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({ expression: `tags=cityGEO-${city}` }),
                                    }
                                );
                                console.log(JSON.stringify({ expression: `tags=cityGEO-${city}` }));
                                const { resources } = await res.json();
                                console.log(resources);

                                cityData[city] = resources.map((resource) => resource.public_id);
                            })
                        );
                        return cityData;
                    };

                    const [banners, cities] = await Promise.all([fetchBanners(), fetchCities()]);
                    return { bannerImages: banners, cities };
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
