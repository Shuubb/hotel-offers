import { Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DefaultLayout from "./layouts/DefaultLayout";
import ContactUsPage from "./pages/ContactUsPage";
import { createAuthBrowserRouter } from "ds-auth-provider";
import ProfilePage from "./pages/user/ProfilePage";
import AddPostPage from "./pages/user/hotel/AddPostPage";
import SettingsPage from "./pages/user/SettingsPage";
import { jwtDecode } from "jwt-decode";
import PostPage from "./pages/PostPage";
const translator = {
    "Contact Us": "დაგვიკავშირდით",
    "Log In": "შესვლა",
    "Sign Up": "რეგისტრაცია",
    "Find Your Holiday Destination!": "იპოვე შენი დასასვენებელი ადგილი!",
    "Contact For Reservations": "დასაჯავშნად დაგვიკავშირდით",
    "Want To Place Offer?": "გსურთ შეთავაზების განთავსება?",
    "Contact Us!": "დაგვიკავშირდით!",
    "Leave The Question": "დაგვიტოვეთ შეკითხვა",
    Name: "სახელი",
    Email: "ელ-ფოსტა",
    Password: "პაროლი",
    Message: "შეტყობინება",
    Register: "რეგისტრაცია",
    Login: "შესვლა",
    "Dont Have An Account?": "არ გაქვთ ანგარიში?",
    "Already Have An Account?": "უკვე გაქვთ ანგარიში?",
    "Forgot Password?": "დაგავიწყდათ პაროლი?",
    "Or Contact Us": "ან დაგვიკავშირდით",
};
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
                        const postsResult = await fetch("/api/getPosts", {
                            method: "POST",
                            body: JSON.stringify({
                                sort: {
                                    views: -1,
                                },
                                limit: 5,
                            }),
                        });
                        const bannerPostsResult = await fetch("/api/getPosts", {
                            method: "POST",
                            body: JSON.stringify({
                                sort: {
                                    views: -1,
                                },
                                filter: {
                                    banner: true,
                                },
                            }),
                        });

                        const posts = await postsResult.json();
                        const bannerPosts = await bannerPostsResult.json();

                        let data = {
                            posts,
                            bannerPosts,
                        };
                        return data;
                    },
                },
                {
                    path: "/post/:postId",
                    element: <PostPage />,
                    loader: async ({ params }) => {
                        const result = await fetch(`/api/getPost/${params.postId}`);

                        return await result.json();
                    },
                },
                {
                    path: "contact",
                    element: <ContactUsPage />,
                },
                {
                    path: "profile/:clientId",
                    element: <ProfilePage />,
                    children: [
                        {
                            path: "addpost",
                            element: <AddPostPage />,
                        },
                        {
                            path: "settings",
                            element: <SettingsPage />,
                        },
                    ],
                    loader: async ({ params }) => {
                        return { clientId: params.clientId };
                    },
                },
            ],
            loader: async () => {
                const jwt = localStorage.getItem("jwt");
                try {
                    const exp = jwtDecode(jwt).exp;
                    const now = Math.floor(Date.now() / 1000);
                    if (exp < now) throw new Error("Expired");
                } catch {
                    localStorage.removeItem("jwt");
                }
                return null;
            },
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
    {
        logo: (
            <Link to="/" className="logo text-center m-0 user-select-none">
                Hotel <br />
                Offers
            </Link>
        ),
        translator,
    }
);
