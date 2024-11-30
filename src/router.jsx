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
                    const res = await fetch(`https://hoteloffers.ge/api/?cityGEO=*`);
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
            {
                path: "contact",
                element: <ContactUsPage />,
            },
        ],
    },
]);
