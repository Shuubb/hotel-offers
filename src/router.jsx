import { Navigate, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DefaultLayout from "./layouts/DefaultLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import ManagePostsPage from "./pages/admin/ManagePostsPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import ManageProfiles from "./pages/admin/ManageProfiles";

export default createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "",
                element: <LandingPage />,
                loader: async () => {
                    const authHeader = `Basic ${btoa("318134288265838:cwzTqFWcZrsZx4OZdcPsZupW-1k")}`;

                    const fetchBanners = async () => {
                        const res = await fetch("/api/resources/search", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: authHeader,
                            },
                            body: JSON.stringify({ expression: `tags=banner-"true"` }),
                        });
                        const { resources } = await res.json();
                        return resources.map((resource) => resource.public_id);
                    };

                    const fetchCities = async () => {
                        const res = await fetch("/api/tags/image?prefix=cityGEO-", {
                            headers: { Authorization: authHeader },
                        });
                        const { tags } = await res.json();
                        console.log(tags);
                        const cityData = {};

                        await Promise.all(
                            tags.map(async (tag) => {
                                const city = tag.split("-")[1];
                                const formData = new FormData();
                                formData.append("expression", `tags=cityGEO-${city}`);

                                const res = await fetch("/api/resources/search", {
                                    method: "POST",
                                    headers: { Authorization: authHeader },
                                    body: formData,
                                });
                                const { resources } = await res.json();
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
