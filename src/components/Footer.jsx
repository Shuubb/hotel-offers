import React from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";

export default function Footer() {
    return (
        <div className="jumbotron">
            <hr className="mx-5"/>
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
                                <li>namdviliImeili@uechveli.com</li>
                                <li>facedokis linki</li>
                                <li>instagramis linki</li>
                            </ul>
                        </small>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
