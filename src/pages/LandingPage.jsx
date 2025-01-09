import { useLoaderData } from "react-router-dom";
import CarouselProvider from "../components/CarouselProvider";
import SelectInput from "../components/SelectInput";
import { MultiLang } from "ds-auth-provider";
import Post from "../components/Post";
import { useEffect } from "react";

export default function LandingPage() {
    const { bannerPosts, posts } = useLoaderData();

    useEffect(() => {
        console.log(bannerPosts.map((bannerPost) => bannerPost.images[0]));
        console.log(bannerPosts);
    }, []);
    return (
        <div>
            <CarouselProvider bannerImages={bannerPosts.map((bannerPost) => bannerPost.images[0])} />
            {/* <SelectInput label={<MultiLang>Find Your Holiday Destination!</MultiLang>} name="search" multiSelect /> */}
            {posts.map((postData) => (
                <Post postData={postData} xs={3} />
            ))}
        </div>
    );
}
