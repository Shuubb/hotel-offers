import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Post from "../components/Post";

export default function PostPage() {
    const postData = useLoaderData();
    useEffect(() => {
        console.log(postData);
    }, []);

    return <Post postData={postData} xs={12} />;
}
