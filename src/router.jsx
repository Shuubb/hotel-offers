import { Navigate, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DefaultLayout from "./layouts/DefaultLayout";
import LZString from "lz-string";
import ContactUsPage from "./pages/ContactUsPage";

export default createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "",
                element: <LandingPage />,
                loader: async () => {
                    const res = await fetch(`https://hoteloffers.ge/api/`);
                    const { images } = await res.json();

                    const data = {
                        bannerImages: images.filter((image) => image.metadata.banner),
                        imagesByCities: images.reduce((acc, currentValue) => {
                            const city = currentValue.metadata.cityGEO;
                            if (currentValue.metadata.english) {
                                const cityENG = currentValue.metadata.cityENG;
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
            {
                path: "contact",
                element: <ContactUsPage />,
            },
        ],
    },
]);
