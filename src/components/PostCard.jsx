import Carousel from "react-bootstrap/Carousel";
import { Card, Col, Row } from "react-bootstrap";
import ModalProvider from "./ModalProvider";
import { BsGoogle, BsPhone } from "react-icons/bs";
import MultiLang from "./MultiLang";
import { useContext } from "react";
import LangContext from "../contexts/LangContext/LangContext";

export default function PostCardProvider({ data }) {
    const { language } = useContext(LangContext);

    return (
        <ModalProvider title={data.metadata["title" + language]} className="h-100">
            <Card
                className="m-2 rounded border-0 user-select-none shadow shadow-hover pointer"
                style={{ width: "300px", aspectRatio: "9/7" }}
            >
                <div
                    style={{
                        backgroundImage: `url(https://imagedelivery.net/Rfx3xvw3hWThLwLzWkoMnQ/${data.id}/public)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                        height: "100%",
                    }}
                    className="rounded-top"
                />

                <Card.Body>
                    <Card.Title>{data.metadata["title" + language]}</Card.Title>
                    <Card.Text>{data.metadata["shortDescription" + language]}</Card.Text>
                </Card.Body>
            </Card>
            <Card className="rounded shadow border p-2">
                <Row>
                    <Col className="d-flex flex-column justify-content-center">
                        <Carousel fade interval={null} controls={false} className="shadow shadow-sm modalImage">
                            {[data.id, ...data.metadata.extraImages].map((id, index) => (
                                <Carousel.Item
                                    key={id + index}
                                    className="rounded h-100"
                                    style={{
                                        aspectRatio: "9/8",
                                        backgroundImage: `url(https://imagedelivery.net/Rfx3xvw3hWThLwLzWkoMnQ/${id}/public)`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                ></Carousel.Item>
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
                                <MultiLang>Contact For Reservations:</MultiLang>
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
