import React, { useEffect, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import ModalProvider from "./ModalProvider";
import { Card, Col, Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { BiMobile } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { BsGoogle, BsPhone } from "react-icons/bs";

export default function CarouselProvider({ bannerImages }) {
    const { language } = useOutletContext();
    const carouselRef = useRef(null);

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    }, [language]);
    const handlePrev = (e) => {
        e.stopPropagation();
        if (carouselRef.current) {
            carouselRef.current.prev();
        }
    };

    const handleNext = (e) => {
        e.stopPropagation();

        if (carouselRef.current) {
            carouselRef.current.next();
        }
    };

    const CarouselImage = ({ prevId, id, nextId }) => (
        <>
            <div
                onClick={handlePrev}
                style={{
                    height: "100%",
                    aspectRatio: "1/1",
                    backgroundImage: `url(https://imagedelivery.net/Rfx3xvw3hWThLwLzWkoMnQ/${prevId}/public)`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "blur(3px) brightness(50%)",
                    cursor: "pointer",
                }}
            />
            <img
                src={`https://imagedelivery.net/Rfx3xvw3hWThLwLzWkoMnQ/${id}/public`}
                height="100%"
                width="auto"
                className="pointer shadow-lg"
            />
            <div
                onClick={handleNext}
                style={{
                    height: "100%",
                    aspectRatio: "1/1",
                    backgroundImage: `url(https://imagedelivery.net/Rfx3xvw3hWThLwLzWkoMnQ/${nextId}/public)`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "blur(3px) brightness(50%)",
                    cursor: "pointer",
                }}
            />
        </>
    );

    return (
        <Carousel
            ref={carouselRef}
            style={{ minWidth: "100%", maxWidth: "100%", height: "50vh", overflow: "hidden", aspectRatio: "9/4" }}
            className="rounded-bottom mb-4 shadow"
            interval={15000}
        >
            {bannerImages.map((bannerImage, index) => (
                <Carousel.Item key={index}>
                    <ModalProvider title={bannerImage.metadata["title" + language]}>
                        <div
                            style={{
                                minWidth: "100%",
                                maxWidth: "100%",
                                height: "50vh",
                                aspectRatio: "9/4",
                            }}
                            className="d-flex justify-content-center bg-black"
                        >
                            <CarouselImage
                                id={bannerImage.id}
                                prevId={bannerImages[index - 1 < 0 ? bannerImages.length - 1 : index - 1].id}
                                nextId={bannerImages[index + 1 >= bannerImages.length ? 0 : index + 1].id}
                            />
                        </div>

                        <Card className="rounded shadow border p-2">
                            <Row>
                                <Col>
                                    <Carousel fade interval={null} controls={false} className="shadow shadow-sm">
                                        {[bannerImage.id, ...bannerImage.metadata.extraImages].map((id, index) => (
                                            <Carousel.Item key={id + index} className="d-flex justify-content-center">
                                                <img
                                                    src={`https://imagedelivery.net/Rfx3xvw3hWThLwLzWkoMnQ/${id}/public`}
                                                    className="rounded"
                                                    width="100%"
                                                    style={{ minWidth: "300px" }}
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </Col>
                                <Col className="d-flex flex-column justify-content-between py-3">
                                    <Card.Body className="p-0">
                                        <Card.Title className="text-center pb-4">
                                            {bannerImage.metadata["shortDescription" + language]}
                                        </Card.Title>
                                        <Card.Text style={{ whiteSpace: "pre-line" }}>
                                            {bannerImage.metadata["longDescription" + language]}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="bg-transparent">
                                        <Card.Title>
                                            {language === "GEO"
                                                ? "დასაჯავშნად დაგვიკავშირდით:"
                                                : "Contact For Reservations:"}
                                        </Card.Title>
                                        <a
                                            href={"mailto:" + bannerImage.metadata.email}
                                            target="_blank"
                                            className="d-flex align-items-center text-decoration-underline my-3"
                                            style={{ color: "#4285F4" }}
                                        >
                                            <BsGoogle className="d-inline-block mx-2" size="25px" />{" "}
                                            {bannerImage.metadata.email}
                                        </a>
                                        <a
                                            href={"tel:" + bannerImage.metadata.phone}
                                            target="_blank"
                                            className="d-flex align-items-center text-decoration-underline my-3"
                                            style={{ color: "#25D366" }}
                                        >
                                            <BsPhone className="d-inline-block mx-2" size="25px" />{" "}
                                            {bannerImage.metadata.phone}
                                        </a>
                                    </Card.Footer>
                                </Col>
                            </Row>
                        </Card>
                    </ModalProvider>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
