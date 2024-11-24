import Carousel from "react-bootstrap/Carousel";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import ModalProvider from "./ModalProvider";
import { BiMobile } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

function renderCarousel(main_id, extraImages) {
    const images = [main_id, ...extraImages];
    return (
        <Carousel fade interval={null} controls={false}>
            {images.map((id, index) => (
                <Carousel.Item key={id + index}>
                    <div
                        style={{
                            width: "100%",
                            aspectRatio: "3/2",
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

export default function PostCardProvider({ data }) {
    const { language } = useOutletContext();

    return (
        <ModalProvider title={data.meta["title" + language]}>
            <Card className="m-2 rounded border-0 user-select-none shadow shadow-hover" style={{ width: "300px" }}>
                {renderCarousel(data.id, data.meta.extraImages)}
                <Card.Body className="pointer">
                    <Card.Title>{data.meta["title" + language]}</Card.Title>
                    <Card.Text>{data.meta["shortDescription" + language]}</Card.Text>
                </Card.Body>
            </Card>
            <Card className="rounded border-0 w-100 border-0">
                {renderCarousel(data.id, data.meta.extraImages)}
                <Card.Body>
                    <Row className="m-1 mb-3">
                        <Card.Title>{data.meta["shortDescription" + language]}</Card.Title>
                        <Card.Text style={{ whiteSpace: "pre-line" }}>
                            {data.meta["longDescription" + language]}
                        </Card.Text>
                    </Row>
                    <Row className="m-1 mb-3">
                        <Card.Title>
                            {language === "GEO" ? "დასაჯავშნად დაგვიკავშირდით:" : "Contact For Reservations:"}
                        </Card.Title>
                        <div className="d-flex">
                            <BiMobile className="text-primary me-2" size="20px" />
                            <a href={"tel:" + data.meta.phone} className="text-primary text-decoration-underline">
                                {data.meta.phone}
                            </a>
                        </div>
                        <div className="d-flex my-2">
                            <MdEmail className="text-primary me-2" size="20px" />
                            <a href={"mailto:" + data.meta.email} className="text-primary text-decoration-underline">
                                {data.meta.email}
                            </a>
                        </div>
                    </Row>
                </Card.Body>
            </Card>
        </ModalProvider>
    );
}
