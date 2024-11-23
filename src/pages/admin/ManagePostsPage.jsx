import { Button, Col, FloatingLabel, Form, Row, Table } from "react-bootstrap";
import ModalProvider from "../../components/ModalProvider";
import SelectInput from "../../components/SelectInput";
import ImageInput from "../../components/ImageInput";
import { useEffect, useState } from "react";

// Constants
const WORKER_API_URL = "https://hoteloffers.ge/api"; // Replace with your Worker URL

// Helper Functions
const fetchResources = async () => {
    const response = await fetch(WORKER_API_URL + "/?city=*");

    if (!response.ok) throw new Error("Failed to fetch resources.");
    const data = await response.json();
    return data.result.images;
};

// Upload image through the Worker
const uploadImage = async (image, metadata = {}) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("metadata", JSON.stringify(metadata));

    const response = await fetch(`${WORKER_API_URL}/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error(error?.message || "Failed to upload image.");
    }
    return response.json();
};

// Delete image through the Worker
const deleteImage = async (imageId) => {
    const response = await fetch(`${WORKER_API_URL}/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: imageId }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Failed to delete image.");
    }
    return response.json();
};

// Map resources with metadata
const mapResourcesWithMetadata = (resources) =>
    resources.map((resource) => ({
        id: resource.id,
        created_at: resource.uploaded,
        metadata: resource.meta || {},
        status: resource.status,
    }));

// Main Component
export default function ManagePostsPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadResources = async () => {
            try {
                const resources = await fetchResources();
                const enrichedPosts = mapResourcesWithMetadata(resources);
                setPosts(enrichedPosts);
            } catch (error) {
                console.error("Error fetching resources:", error);
            }
        };

        loadResources();
    }, []);

    return (
        <div className="w-100 m-2 p-3">
            <SearchBar />
            <PostsTable posts={posts} />
        </div>
    );
}

// Search Bar
function SearchBar() {
    return (
        <Row className="p-2 border rounded shadow my-2">
            <Col>
                <h4>Search</h4>
                <hr className="m-0" />
            </Col>
        </Row>
    );
}

// Posts Table
function PostsTable({ posts }) {
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
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <PostRow key={post.id} post={post} />
                    ))}
                </tbody>
            </Table>
        </Row>
    );
}

// Post Row
function PostRow({ post }) {
    const { id, created_at, metadata, status } = post;

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await deleteImage(id);
                window.location.reload();
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    return (
        <tr>
            <td>{id}</td>
            <td>{metadata.title || "Unknown"}</td>
            <td>{metadata.city || "Unknown"}</td>
            <td>{created_at}</td>
            <td className={`text-${status === "active" ? "success" : "danger"}`}>{status}</td>
            <td>
                <Button variant="danger" size="sm" onClick={handleDelete}>
                    Delete
                </Button>
            </td>
        </tr>
    );
}

// Add Post
function AddPost() {
    const [finalImages, setFinalImages] = useState([]);
    const [isBanner, setIsBanner] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const extraImages = [];

        try {
            // Upload additional images
            for (const image of finalImages.slice(1)) {
                const res = await uploadImage(image);
                extraImages.push(res.result.id);
            }

            // Upload primary image with metadata
            const metadata = buildMetadata(e, extraImages, isBanner);
            await uploadImage(finalImages[0], metadata);
            window.location.reload();
        } catch (error) {
            console.error("Error uploading post:", error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <SelectInput name="city" label="Choose City" options={["Tbilisi", "Batumi", "Kutaisi"]} className="my-1" />
            <ImageInput name="images" setFinalImages={setFinalImages} />
            <FloatingLabel label="Post Title" className="my-1">
                <Form.Control name="title" placeholder="" required />
            </FloatingLabel>
            <FloatingLabel label="Short Description" className="my-1">
                <Form.Control as="textarea" name="shortDescription" placeholder="" style={{ height: "80px" }} />
            </FloatingLabel>
            <FloatingLabel label="Long Description" className="my-1">
                <Form.Control as="textarea" name="longDescription" placeholder="" style={{ height: "150px" }} />
            </FloatingLabel>
            <Form.Check type="checkbox" label="Banner" onChange={(e) => setIsBanner(e.target.checked)} />
            <Button type="submit">Submit</Button>
        </Form>
    );
}

// Metadata Builder
const buildMetadata = (e, extraImages, isBanner) => ({
    city: e.target.elements["city"].value,
    title: e.target.elements["title"].value,
    shortDescription: e.target.elements["shortDescription"].value,
    longDescription: e.target.elements["longDescription"].value,
    banner: isBanner,
    extraImages,
});
