import { useLoaderData } from "react-router-dom";
import CarouselProvider from "../components/CarouselProvider";
import SelectInput from "../components/SelectInput";
import { MultiLang } from "ds-auth-provider";

export default function LandingPage() {
    const { bannerPosts, posts } = useLoaderData();

    return (
        <div>
            <CarouselProvider bannerPosts={bannerPosts} />
            {/* <SelectInput label={<MultiLang>Find Your Holiday Destination!</MultiLang>} name="search" multiSelect /> */}
            {posts.map((post) => (
                <div>{JSON.stringify(post)}</div>
            ))}
        </div>
    );
}
