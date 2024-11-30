import React, { useEffect } from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { BsFacebook, BsGoogle, BsInstagram, BsPhone, BsSend } from "react-icons/bs";
import { useLocation, useOutletContext } from "react-router-dom";

export default function ContactUsPage() {
    const { language } = useOutletContext();

    const text = (GEO, ENG) => (language === "GEO" ? GEO : ENG);

    return (
        <div className="py-5">
            <h1 className="fs-1 text-center">{text("დაგვიტოვეთ კითხვა", "Leave The Question")}</h1>
            <Form
                className="d-flex justify-content-center"
                action="https://formsubmit.co/sales@hoteloffers.ge"
                method="POST"
            >
                <Col className="border rounded bg-white shadow p-3 my-4" md={6}>
                    <Row>
                        <Col xs={7}>
                            <FloatingLabel label={text("სახელი", "Name")} className="my-1">
                                <Form.Control name="name" placeholder="" required />
                            </FloatingLabel>
                            <FloatingLabel label={text("ელ-ფოსტა", "Email")} className="my-1">
                                <Form.Control name="email" type="email" placeholder="" required />
                            </FloatingLabel>
                        </Col>
                        <Col className="p-2 pe-3">
                            <Button
                                className="w-100 h-100 d-flex justify-content-center align-items-center"
                                type="submit"
                            >
                                <BsSend size="4rem" />
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FloatingLabel label={text("შეტყობინება", "Message")} className="my-1">
                                <Form.Control
                                    as="textarea"
                                    name="message"
                                    placeholder=""
                                    style={{ height: "15rem" }}
                                    required
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Col>
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_subject" value="New submission!" />
                <input type="hidden" name="_next" value={window.location.origin.toString()} />
            </Form>
            <h1 className="fs-1 text-center">{text("ან დაგვიკავშირდით", "Or Contact Us")}</h1>
            <div className="m-4">
                <Row>
                    <Col className="d-flex justify-content-center my-1">
                        <a
                            href="mailto:sales@hoteloffers.ge"
                            target="_blank"
                            className="d-flex align-items-center"
                            style={{ color: "#4285F4" }}
                        >
                            <BsGoogle className="d-inline-block m-2" size="25px" /> sales@hoteloffers.ge
                        </a>
                    </Col>
                    <Col className="d-flex justify-content-center my-1">
                        <a
                            href="tel:+995 571 53 53 89"
                            target="_blank"
                            className="d-flex align-items-center"
                            style={{ color: "#25D366" }}
                        >
                            <BsPhone className="d-inline-block m-2" size="25px" /> (+995) 571 53 53 89
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center my-1">
                        <a
                            href="https://www.facebook.com/HotelOffersGeo/"
                            target="_blank"
                            className="d-flex align-items-center"
                            style={{ color: "#4267B2" }}
                        >
                            <BsFacebook className="d-inline-block m-2" size="25px" /> HotelOffers.ge - Stay & Save
                        </a>
                    </Col>
                    <Col className="d-flex justify-content-center my-1">
                        <a
                            href="https://www.instagram.com/hoteloffers.ge/"
                            target="_blank"
                            className="d-flex align-items-center"
                            style={{ color: "#e95950" }}
                        >
                            <BsInstagram className="d-inline-block m-2" size="25px" /> hoteloffers.ge
                        </a>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
