import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { BsFacebook, BsGoogle, BsInstagram, BsPhone } from "react-icons/bs";

export default function DefaultLayout() {
    const [language, setLanguage] = useState("GEO");
    const location = useLocation();
    return (
        <div className="jumbotron">
            <NavBar language={language} setLanguage={setLanguage} />
            <Container>
                <Outlet context={{ language }} />
            </Container>
            <div className="jumbotron">
                <hr className="mx-5" />
                <Container>
                    <Row>
                        <Col className="d-flex justify-content-center" style={{ minWidth: "12rem" }}>
                            {location.pathname !== "/contact" && (
                                <small className="d-inline-block">
                                    <strong className="text-center">
                                        {language === "GEO" ? (
                                            <>
                                                <p>გსურთ შეთავაზების განთავსება?</p>
                                                <p>დაგვიკავშირდით!</p>
                                            </>
                                        ) : (
                                            <>
                                                <p>Want To Place Offer?</p> <p>Contact Us!</p>
                                            </>
                                        )}
                                    </strong>
                                    <a
                                        href="mailto:sales@hoteloffers.ge"
                                        target="_blank"
                                        className="d-flex align-items-center"
                                        style={{ color: "#4285F4" }}
                                    >
                                        <BsGoogle className="d-inline-block m-2" size="25px" /> sales@hoteloffers.ge
                                    </a>
                                    <a
                                        href="tel:+995 571 53 53 89"
                                        target="_blank"
                                        className="d-flex align-items-center"
                                        style={{ color: "#25D366" }}
                                    >
                                        <BsPhone className="d-inline-block m-2" size="25px" /> (+995) 571 53 53 89
                                    </a>
                                    <a
                                        href="https://www.facebook.com/HotelOffersGeo/"
                                        target="_blank"
                                        className="d-flex align-items-center"
                                        style={{ color: "#4267B2" }}
                                    >
                                        <BsFacebook className="d-inline-block m-2" size="25px" /> HotelOffers.ge - Stay
                                        & Save
                                    </a>
                                    <a
                                        href="https://www.instagram.com/hoteloffers.ge/"
                                        target="_blank"
                                        className="d-flex align-items-center"
                                        style={{ color: "#e95950" }}
                                    >
                                        <BsInstagram className="d-inline-block m-2" size="25px" /> hoteloffers.ge
                                    </a>
                                </small>
                            )}
                        </Col>
                        <Col className="d-flex justify-content-center" style={{ minWidth: "12rem" }}></Col>
                        <Col className="d-flex justify-content-center" style={{ minWidth: "12rem" }}></Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
