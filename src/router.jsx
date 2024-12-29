import { Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DefaultLayout from "./layouts/DefaultLayout";
import ContactUsPage from "./pages/ContactUsPage";
import { createAuthBrowserRouter } from "ds-auth-provider";

export default createAuthBrowserRouter(
    [
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
                        let data = {
                            bannerImages: [],
                            imagesByCities: [],
                        };
                        if (images) {
                            data.bannerImages = images.filter((image) => image.metadata.banner);
                            data.imagesByCities = images.reduce((acc, currentValue) => {
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
                            }, {});
                        }
                        return data;
                    },
                },
                {
                    path: "contact",
                    element: <ContactUsPage />,
                },
            ],
        },
        {
            path: "*",
            element: (
                <div className="vh-100 vw-100 d-flex justify-content-center align-items-center fs-1 flex-column">
                    <div className="logo text-center user-select-none m-2 hover" style={{ fontSize: "100px" }}>
                        Hotel
                        <br /> Offers
                    </div>
                    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center fs-1 flex-column text-center">
                        Oops! You Are On The Wrong Place :D
                        <Link to="/" variant="success" className="btn fs-1 btn-success m-2 ">
                            Go To Main Page
                        </Link>
                    </div>
                </div>
            ),
        },
    ],
    <Link to="/" className="logo text-center m-0 user-select-none">
        Hotel <br />
        Offers
    </Link>
);
