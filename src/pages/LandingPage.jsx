import { useLoaderData } from "react-router-dom";
import CarouselProvider from "../components/CarouselProvider";
import Post from "../components/Post";

export default function LandingPage() {
    const { bannerPosts, posts } = useLoaderData();

    return (
        <div>
            <CarouselProvider bannerImages={bannerPosts.map((bannerPost) => bannerPost.images[0])} />
            {/* <SelectInput label={<MultiLang>Find Your Holiday Destination!</MultiLang>} name="search" multiSelect /> */}
            {posts.map((postData) => (
                <Post postData={postData} xs={3} height={"210px"} goto />
            ))}
        </div>
    );
}
