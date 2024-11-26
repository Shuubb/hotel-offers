import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import PostsTable from "./PostsTable";
import LZString from "lz-string";
import { useLoaderData } from "react-router-dom";

export default function ManagePostsPage() {
    const posts = useLoaderData();

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
