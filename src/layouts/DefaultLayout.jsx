import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import { BsFacebook, BsGoogle, BsInstagram, BsPhone } from "react-icons/bs";
import MultiLang from "../components/MultiLang";

export default function DefaultLayout() {
    const location = useLocation();
    return (
        <div className="jumbotron">
            <NavBar />
            <Container>
                <Outlet />
            </Container>
            <div className="jumbotron">
                <hr className="mx-5" />
                <Container>
                    <Row>
                        <Col className="d-flex justify-content-center" style={{ minWidth: "12rem" }}>
                            {location.pathname !== "/contact" && (
                                <small className="d-inline-block">
                                    <strong className="text-center">
                                        <p>
                                            <MultiLang>Want To Place Offer?</MultiLang>
                                        </p>
                                        <p>
                                            <MultiLang>Contact Us!</MultiLang>
                                        </p>
                                    </strong>
                                    <a
                                        href="mailto:sales@hoteloffers.ge"
                                        target="_blank"
                                        className="d-flex align-items-center text-decoration-underline my-3"
                                        style={{ color: "#4285F4" }}
                                    >
                                        <BsGoogle className="d-inline-block mx-2" size="25px" /> sales@hoteloffers.ge
                                    </a>
                                    <a
                                        href="tel:+995 571 53 53 89"
                                        target="_blank"
                                        className="d-flex align-items-center text-decoration-underline my-3"
                                        style={{ color: "#25D366" }}
                                    >
                                        <BsPhone className="d-inline-block mx-2" size="25px" /> (+995) 571 53 53 89
                                    </a>
                                    <a
                                        href="https://www.facebook.com/HotelOffersGe/"
                                        target="_blank"
                                        className="d-flex align-items-center text-decoration-underline my-3"
                                        style={{ color: "#4267B2" }}
                                    >
                                        <BsFacebook className="d-inline-block mx-2" size="25px" /> HotelOffers.ge - Stay
                                        & Save
                                    </a>
                                    <a
                                        href="https://www.instagram.com/hoteloffers.ge/"
                                        target="_blank"
                                        className="d-flex align-items-center text-decoration-underline my-3"
                                        style={{ color: "#e95950" }}
                                    >
                                        <BsInstagram className="d-inline-block mx-2" size="25px" /> hoteloffers.ge
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
