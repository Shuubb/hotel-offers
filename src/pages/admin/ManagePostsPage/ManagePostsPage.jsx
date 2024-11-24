import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import PostsTable from "./PostsTable";
import LZString from "lz-string";

export default function ManagePostsPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("https://hoteloffers.ge/api/?cityGEO=*&cityENG=*").then((response) =>
            response.json().then((data) => {
                const resources = data.result.images;
                const enrichedPosts = resources.map((resource) => ({
                    id: resource.id,
                    created_at: resource.uploaded,
                    metadata:
                        {
                            cityGEO: resource.meta.cityGEO,
                            ...JSON.parse(LZString.decompressFromUTF16(resource.meta.data)),
                        } || {},
                    status: resource.status,
                }));
                console.log(enrichedPosts);
                setPosts(enrichedPosts);
            })
        );
    }, []);

    return (
        <div className="w-100 m-2 p-3">
            <Row className="p-2 border rounded shadow my-2">
                <Col>
                    <h4>Search</h4>
                    <hr className="m-0" />
                </Col>
            </Row>
            <PostsTable posts={posts} />
        </div>
    );
}
