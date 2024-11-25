import Carousel from "react-bootstrap/Carousel";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import ModalProvider from "./ModalProvider";
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

export default function PostCardProvider({ data }) {
    const { language } = useOutletContext();

    return (
        <ModalProvider title={data.meta["title" + language]} className="h-100">
            <Card className="m-2 rounded border-0 user-select-none shadow shadow-hover" style={{ width: "300px" }}>
                {renderCarousel(data.id, data.meta.extraImages)}
                <Card.Body className="pointer">
                    <Card.Title>{data.meta["title" + language]}</Card.Title>
                    <Card.Text>{data.meta["shortDescription" + language]}</Card.Text>
                </Card.Body>
            </Card>
            <Card className="rounded border-0 w-100 border-0 h-100">
                <Row>
                    <Col>
                        {renderCarousel(data.id, data.meta.extraImages)}
                        <Card.Body>
                            <Row className=" mb-3 text-center">
                                <Card.Title>{data.meta["shortDescription" + language]}</Card.Title>
                            </Row>
                        </Card.Body>
                    </Col>
                    <Col className="d-flex flex-column justify-content-between py-3">
                        <Row>
                            <Card.Text style={{ whiteSpace: "pre-line" }}>
                                {data.meta["longDescription" + language]}
                            </Card.Text>
                        </Row>

                        <Row>
                            <hr className="p-2 my-3" />
                            <Card.Title>
                                {language === "GEO" ? "დასაჯავშნად დაგვიკავშირდით:" : "Contact For Reservations:"}
                            </Card.Title>
                            <div className="d-flex my-2">
                                <BiMobile className="text-primary me-2" size="20px" />
                                <a href={"tel:" + data.meta.phone} className="text-primary text-decoration-underline">
                                    {data.meta.phone}
                                </a>
                            </div>
                            <div className="d-flex my-2">
                                <MdEmail className="text-primary me-2" size="20px" />
                                <a
                                    href={"mailto:" + data.meta.email}
                                    className="text-primary text-decoration-underline"
                                >
                                    {data.meta.email}
                                </a>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </ModalProvider>
    );
}
