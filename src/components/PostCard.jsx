import Carousel from "react-bootstrap/Carousel";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import ModalProvider from "./ModalProvider";

function renderCarousel(public_id, extraImages) {
    const images = [public_id, ...JSON.parse(extraImages)];
    return (
        <Carousel fade interval={null} controls={false}>
            {images.map((id, index) => (
                <Carousel.Item key={id + index}>
                    <div
                        style={{
                            height: "220px",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundImage: `url(https://res.cloudinary.com/dmltpftir/image/upload/v1731788700/${id}.jpg)`,
                        }}
                        className="rounded-top"
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

// Main PostCardProvider Component
export default function PostCardProvider({ public_id, modal = true }) {
    const { language } = useOutletContext();

    const [data, setData] = useState({
        title: "Loading...",
        shortDescription: "Loading...",
        longDescription: "Loading...",
        extraImages: "[]",
    });

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const url = `/api/resources/image/upload/${public_id}`;
                const response = await fetch(url, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${btoa("318134288265838:cwzTqFWcZrsZx4OZdcPsZupW-1k")}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch post data.");
                const result = await response.json();

                const parsedData = result.tags.reduce((acc, tag) => {
                    const [key, ...valueParts] = tag.split("-");
                    acc[key] = valueParts.join("-").replaceAll("$comma$", ",").slice(1, -1);
                    return acc;
                }, {});

                setData((prev) => ({
                    ...prev,
                    ...parsedData,
                }));
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };

        fetchPostData();
    }, [public_id]);

    return (
        <ModalProvider title={data["title" + language]}>
            <Card className="m-2 rounded border-0 user-select-none shadow shadow-hover" style={{ width: "300px" }}>
                {renderCarousel(public_id, data.extraImages)}
                <Card.Body className="pointer">
                    <Card.Title>{data["title" + language]}</Card.Title>
                    <Card.Text>{data["shortDescription" + language]}</Card.Text>
                </Card.Body>
            </Card>
            <Card className="rounded border-0 w-100 border-0">
                {renderCarousel(public_id, data.extraImages)}
                <Card.Body>
                    <Card.Text>
                        <strong>{data["shortDescription" + language]}</strong>
                    </Card.Text>
                    <Card.Text style={{ whiteSpace: "pre-line" }}>
                        <br />
                        {data["longDescription" + language]}
                    </Card.Text>
                </Card.Body>
            </Card>
        </ModalProvider>
    );
}
