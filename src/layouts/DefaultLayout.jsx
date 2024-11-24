import { Col, Container, Row } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function DefaultLayout() {
    const [language, setLanguage] = useState("GEO");
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
                        <Col>
                            <small>
                                <strong>
                                    Want To Place Offer?
                                    <br />
                                    Contact Us!
                                </strong>
                                <ul>
                                    <li>sales@hoteloffers.ge</li>
                                    <li>facedokis linki</li>
                                    <li>instagramis linki</li>
                                </ul>
                            </small>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
