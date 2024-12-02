import Carousel from "react-bootstrap/Carousel";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import ModalProvider from "./ModalProvider";
import { BiMobile } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { BsGoogle, BsPhone } from "react-icons/bs";

export default function PostCardProvider({ data }) {
    const { language } = useOutletContext();

    return (
        <ModalProvider title={data.metadata["title" + language]} className="h-100">
            <Card
                className="m-2 rounded border-0 user-select-none shadow shadow-hover pointer"
                style={{ width: "300px" }}
            >
                <img
                    src={`https://imagedelivery.net/Rfx3xvw3hWThLwLzWkoMnQ/${data.id}/public`}
                    className="rounded-top"
                    width="100%"
                />
                <Card.Body>
                    <Card.Title>{data.metadata["title" + language]}</Card.Title>
                    <Card.Text>{data.metadata["shortDescription" + language]}</Card.Text>
                </Card.Body>
            </Card>
            <Card className="rounded shadow border p-2">
                <Row>
                    <Col>
                        <Carousel fade interval={null} controls={false} className="shadow shadow-sm">
                            {[data.id, ...data.metadata.extraImages].map((id, index) => (
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
                                {data.metadata["shortDescription" + language]}
                            </Card.Title>
                            <Card.Text style={{ whiteSpace: "pre-line" }}>
                                {data.metadata["longDescription" + language]}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="bg-transparent">
                            <Card.Title>
                                {language === "GEO" ? "დასაჯავშნად დაგვიკავშირდით:" : "Contact For Reservations:"}
                            </Card.Title>
                            <a
                                href={"mailto:" + data.metadata.email}
                                target="_blank"
                                className="d-flex align-items-center text-decoration-underline my-3"
                                style={{ color: "#4285F4" }}
                            >
                                <BsGoogle className="d-inline-block mx-2" size="25px" /> {data.metadata.email}
                            </a>
                            <a
                                href={"tel:" + data.metadata.phone}
                                target="_blank"
                                className="d-flex align-items-center text-decoration-underline my-3"
                                style={{ color: "#25D366" }}
                            >
                                <BsPhone className="d-inline-block mx-2" size="25px" /> {data.metadata.phone}
                            </a>
                        </Card.Footer>
                    </Col>
                </Row>
            </Card>
        </ModalProvider>
    );
}
