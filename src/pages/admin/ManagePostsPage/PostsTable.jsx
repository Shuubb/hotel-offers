import React from "react";
import { Row, Button, Table } from "react-bootstrap";
import ModalProvider from "../../../components/ModalProvider";
import AddPost from "./AddPosts";

export default function PostsTable({ posts }) {
    const deletePost = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                const response = await fetch(`https://hoteloffers.ge/adminapi/delete`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id }),
                });

                if (!response.ok) {
                    const { message } = await response.json();
                    throw new Error(message || "Failed to delete post.");
                }

                window.location.reload();
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    return (
        <Row className="p-2 border rounded shadow my-2">
            <ModalProvider title="Add Post">
                <Button variant="success my-3">Add Post</Button>
                <AddPost />
            </ModalProvider>

            <Table bordered striped hover>
                <thead>
                    <tr>
                        <th>Post ID</th>
                        <th>Post Title</th>
                        <th>City</th>
                        <th>Creation Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(({ id, created_at, metadata, status }) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{metadata?.titleGEO || "Unknown"}</td>
                            <td>{metadata?.cityGEO || "Unknown"}</td>
                            <td>{created_at}</td>
                            <td className={`text-${status === "active" ? "success" : "danger"}`}>{status}</td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => deletePost(id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Row>
    );
}
