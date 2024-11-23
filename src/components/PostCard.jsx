import Carousel from "react-bootstrap/Carousel";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Card } from "react-bootstrap";
import ModalProvider from "./ModalProvider";

function renderCarousel(main_id, extraImages) {
    const images = [main_id, ...extraImages];
    return (
        <Carousel fade interval={null} controls={false}>
            {images.map((id, index) => (
                <Carousel.Item key={id + index}>
                    <div
                        style={{
                            height: "220px",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundImage: `url(https://imagedelivery.net/Rfx3xvw3hWThLwLzWkoMnQ/${id}/public)`,
                        }}
                        className="rounded-top"
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

// Main PostCardProvider Component
export default function PostCardProvider({ data, modal = true }) {
    const { language } = useOutletContext();

    return (
        <ModalProvider title={data.meta["title"]}>
            <Card className="m-2 rounded border-0 user-select-none shadow shadow-hover" style={{ width: "300px" }}>
                {renderCarousel(data.id, data.meta.extraImages)}
                <Card.Body className="pointer">
                    <Card.Title>{data.meta["title"]}</Card.Title>
                    <Card.Text>{data.meta["shortDescription"]}</Card.Text>
                </Card.Body>
            </Card>
            <Card className="rounded border-0 w-100 border-0">
                {renderCarousel(data.id, data.meta.extraImages)}
                <Card.Body>
                    <Card.Text>
                        <strong>{data.meta["shortDescription"]}</strong>
                    </Card.Text>
                    <Card.Text style={{ whiteSpace: "pre-line" }}>
                        <br />
                        {data.meta["longDescription"]}
                    </Card.Text>
                </Card.Body>
            </Card>
        </ModalProvider>
    );
}
