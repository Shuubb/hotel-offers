import { Navigate, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DefaultLayout from "./layouts/DefaultLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import ManagePostsPage from "./pages/admin/ManagePostsPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import ManageProfiles from "./pages/admin/ManageProfiles";

const auth = "89MmxaKZYYlM_Fg2HNpj6fSZqG0AiO2gWpCl8DEo"; // Existing Auth Token

// Set the new base URL for the API
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
                    const res = await fetch(`${BASE_URL}?city=*`);
                    const {
                        result: { images },
                    } = await res.json();
                    console.log(images);
                    const data = {
                        bannerImages: images.filter((image) => image.meta.banner),
                        imagesByCities: images.reduce((acc, currentValue) => {
                            const city = currentValue.meta.city;
                            if (!acc[city]) {
                                acc[city] = [];
                            }
                            acc[city].push(currentValue);
                            return acc;
                        }, {}),
                    };
                    console.log(data);
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
