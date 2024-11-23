import { Button, Col, FloatingLabel, Form, Row, Table } from "react-bootstrap";
import ModalProvider from "../../components/ModalProvider";
import SelectInput from "../../components/SelectInput";
import ImageInput from "../../components/ImageInput";
import { useEffect, useState } from "react";

// Constants
const AUTH_HEADER = `Basic ${btoa("318134288265838:cwzTqFWcZrsZx4OZdcPsZupW-1k")}`;
const API_URL = "https://cloudinaryapi.shubitidzed9.workers.dev/resources";

// Helper functions
const fetchResources = async () => {
    const response = await fetch(`${API_URL}/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: AUTH_HEADER,
        },
        body: JSON.stringify({ expression: "tags=cityENG-*" }),
    });

    if (!response.ok) throw new Error("Failed to fetch resources.");
    return response.json();
};

const fetchImageData = async (publicId) => {
    const response = await fetch(`${API_URL}/image/upload/${publicId}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: AUTH_HEADER,
        },
    });

    if (!response.ok) throw new Error(`Failed to fetch image for ${publicId}`);
    return response.json();
};

const mapResourcesWithImages = async (resources) => {
    return Promise.all(
        resources.map(async (resource) => {
            const imageData = await fetchImageData(resource.public_id);
            return { ...imageData, status: resource.status };
        })
    );
};

// Main Component
export default function ManagePostsPage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadResources = async () => {
            try {
                const data = await fetchResources();
                const enrichedPosts = await mapResourcesWithImages(data.resources);
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
                        <th>Hotel Name</th>
                        <th>Creation Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <PostRow key={post.public_id} post={post} />
                    ))}
                </tbody>
            </Table>
        </Row>
    );
}

function PostRow({ post }) {
    const titleTag = post.tags.find((tag) => tag.startsWith(`titleENG-`));
    const title = titleTag ? titleTag.split("-").slice(1).join("-").slice(1, -1) : "Unknown";
    const extraImagesTag = post.tags.find((tag) => tag.startsWith(`extraImages-`));
    const extraImages = extraImagesTag ? JSON.parse(extraImagesTag.split("-").slice(1).join("-").slice(1, -1)) : [];

    return (
        <ModalProvider title={title}>
            <tr className="pointer">
                <td>{post.public_id}</td>
                <td>{title}</td>
                <td>Ibis Styles Tbilisi Center</td>
                <td>{post.created_at}</td>
                <td className={`text-${post.status === "active" ? "success" : "danger"}`}>{post.status}</td>
            </tr>
            <Row>
                <Col></Col>
                <Col>
                    <ModalProvider size="sm" title="Think Again">
                        <Button variant="danger">Delete This Post</Button>
                        <div>
                            <p>Are you sure you want to delete this post?</p>
                            <div className="d-flex justify-content-end">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="m-2"
                                    onClick={() => {
                                        fetch(
                                            `https://cloudinaryapi.shubitidzed9.workers.dev/resources/image/upload?public_ids=${[
                                                ...extraImages,
                                                post.public_id,
                                            ].join()}`,
                                            {
                                                method: "DELETE",
                                                headers: {
                                                    Authorization: AUTH_HEADER,
                                                },
                                            }
                                        )
                                            .then((res) => res.json())
                                            .then(() => location.reload());
                                    }}
                                >
                                    I'm Sure
                                </Button>
                                <Button variant="success" className="m-2" size="sm">
                                    No Dont Delete!!!
                                </Button>
                            </div>
                        </div>
                    </ModalProvider>
                </Col>
            </Row>
        </ModalProvider>
    );
}

function AddPost() {
    const [finalImages, setFinalImages] = useState([]);
    const [isBanner, setIsBanner] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const extraImages = [];

        try {
            await Promise.all(
                finalImages.slice(1).map((image) => uploadImage(image).then((res) => extraImages.push(res.public_id)))
            );

            const tags = buildTags(e, extraImages, isBanner);
            await uploadImage(finalImages[0], tags);
            location.reload();
        } catch (error) {
            console.log("Error uploading post:", error);
        }
    };

    return (
        <Row>
            <Form onSubmit={handleSubmit}>
                <SelectInput
                    name="city"
                    label="Choose City"
                    options={[
                        "თელავი | Telavi",
                        "თბილისი | Tbilisi",
                        "გორი | Gori",
                        "ქარელი | Kareli",
                        "ბათუმი | Batumi",
                        "ქუთაისი | Kutaisi",
                        "საგურამო | Saguramo",
                        "წინანდალი | Tsinandali",
                    ]}
                    className="my-1"
                />
                <ImageInput name="images" setFinalImages={setFinalImages} />
                <FloatingLabel label="Post Title" className="shadow shadow-hover my-1">
                    <Form.Control name="title" placeholder="" />
                </FloatingLabel>
                <FloatingLabel label="Short Description" className="shadow shadow-hover my-1">
                    <Form.Control as="textarea" name="shortDescription" placeholder="" style={{ height: "80px" }} />
                </FloatingLabel>
                <FloatingLabel label="Long Description" className="shadow shadow-hover my-1">
                    <Form.Control as="textarea" name="longDescription" placeholder="" style={{ height: "150px" }} />
                </FloatingLabel>
                <Form.Check
                    type="checkbox"
                    id="banner-checkbox"
                    label="Banner"
                    className="my-2"
                    onChange={(e) => setIsBanner(e.target.checked)}
                />
                <Button variant="success" type="submit">
                    Submit
                </Button>
            </Form>
        </Row>
    );
}
// Helper for uploading images
const uploadImage = async (image, tags = []) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("api_key", "318134288265838");
    formData.append("upload_preset", "hcemftz8");
    if (tags.length) formData.append("tags", tags.join(","));

    const response = await fetch(`https://api.cloudinary.com/v1_1/dmltpftir/image/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) throw new Error("Failed to upload image.");
    return response.json();
};

// Helper to build tags
const buildTags = (e, extraImages, isBanner) => [
    `cityGEO-"${e.target.elements["city"].value.split("|")[0].replaceAll(",", "$comma$")}"`,
    `cityENG-"${e.target.elements["city"].value.split("|")[1].replaceAll(",", "$comma$")}"`,
    `titleGEO-"${e.target.elements["title"].value.split("|")[0].replaceAll(",", "$comma$")}"`,
    `titleENG-"${e.target.elements["title"].value.split("|")[1].replaceAll(",", "$comma$")}"`,
    `shortDescriptionGEO-"${e.target.elements["shortDescription"].value.split("|")[0].replaceAll(",", "$comma$")}"`,
    `shortDescriptionENG-"${e.target.elements["shortDescription"].value.split("|")[1].replaceAll(",", "$comma$")}"`,
    `longDescriptionGEO-"${e.target.elements["longDescription"].value.split("|")[0].replaceAll(",", "$comma$")}"`,
    `longDescriptionENG-"${e.target.elements["longDescription"].value.split("|")[1].replaceAll(",", "$comma$")}"`,
    `banner-"${isBanner}"`,
    `extraImages-"${JSON.stringify(extraImages)}"`,
];
