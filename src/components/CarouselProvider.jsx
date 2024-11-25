import React from "react";
import Carousel from "react-bootstrap/Carousel";
import ModalProvider from "./ModalProvider";
import { Card, Col, Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { BiMobile } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

function renderCarousel(main_id, extraImages, imgClass = "") {
    const images = [main_id, ...extraImages];
    return (
        <Carousel fade interval={null} controls={false}>
            {images.map((id, index) => (
                <Carousel.Item key={id + index}>
                    <img
                        src={`https://imagedelivery.net/Rfx3xvw3hWThLwLzWkoMnQ/${id}/public`}
                        className="rounded-top"
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default function CarouselProvider({ bannerImages }) {
    const { language } = useOutletContext();

    const CarouselImage = ({ id, ...props }) => (
        <div
            style={{
                minWidth: "100%",
                maxWidth: "100%",
                height: "50vh",
                aspectRatio: "9/4",
                backgroundImage: `url(https://imagedelivery.net/Rfx3xvw3hWThLwLzWkoMnQ/${id}/public)`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                cursor: "pointer",
            }}
            {...props}
        />
    );

    return (
        <Carousel
            style={{ minWidth: "100%", maxWidth: "100%", height: "50vh", overflow: "hidden", aspectRatio: "9/4" }}
            className="rounded-bottom mb-4 shadow"
            interval={15000}
        >
            {bannerImages.map((bannerImage, index) => (
                <Carousel.Item key={index}>
                    <ModalProvider title={bannerImage.meta["title" + language]}>
                        <CarouselImage id={bannerImage.id} />

                        <Card className="rounded border-0 w-100 border-0 h-100">
                            <Row>
                                <Col>
                                    {renderCarousel(bannerImage.id, bannerImage.meta.extraImages)}
                                    <Card.Body>
                                        <Row className=" mb-3 text-center">
                                            <Card.Title>{bannerImage.meta["shortDescription" + language]}</Card.Title>
                                        </Row>
                                    </Card.Body>
                                </Col>
                                <Col className="d-flex flex-column justify-content-between py-3">
                                    <Row>
                                        <Card.Text style={{ whiteSpace: "pre-line" }}>
                                            {bannerImage.meta["longDescription" + language]}
                                        </Card.Text>
                                    </Row>
                                    <Row>
                                        <hr className="p-2 my-3" />
                                        <Card.Title>
                                            {language === "GEO"
                                                ? "დასაჯავშნად დაგვიკავშირდით:"
                                                : "Contact For Reservations:"}
                                        </Card.Title>
                                        <div className="d-flex my-2">
                                            <BiMobile className="text-primary me-2" size="20px" />
                                            <a
                                                href={"tel:" + bannerImage.meta.phone}
                                                className="text-primary text-decoration-underline"
                                            >
                                                {bannerImage.meta.phone}
                                            </a>
                                        </div>
                                        <div className="d-flex my-2">
                                            <MdEmail className="text-primary me-2" size="20px" />
                                            <a
                                                href={"mailto:" + bannerImage.meta.email}
                                                className="text-primary text-decoration-underline"
                                            >
                                                {bannerImage.meta.email}
                                            </a>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </ModalProvider>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
