import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Post from "../components/Post";

export default function PostPage() {
    const postData = useLoaderData();

    return <Post postData={postData} xs={12} />;
}
