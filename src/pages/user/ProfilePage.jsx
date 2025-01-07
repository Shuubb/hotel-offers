import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Nav } from "react-bootstrap/esm";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { MultiLang } from "ds-auth-provider";
import useLocalStorage from "use-local-storage";
import { jwtDecode } from "jwt-decode";

export default function ProfilePage() {
    const { clientId } = useLoaderData();
    const [jwt, setJwt] = useLocalStorage("jwt", localStorage.getItem("jwt"));
    const user = jwt ? jwtDecode(jwt) : { role: "guest" };
    return (
        <Container fluid>
            <Row>
                {user.userId === clientId && (
                    <Col xs={3} className="d-flex align-items-center justify-content-center flex-column">
                        {user.role === "hotel" && (
                            <Nav.Link
                                as={Link}
                                to={`/profile/${clientId}/addpost`}
                                className="w-100 text-center p-2 m-1 border-bottom border-top"
                            >
                                <MultiLang>Add Post</MultiLang>
                            </Nav.Link>
                        )}
                        <Nav.Link
                            as={Link}
                            to={`/profile/${clientId}/settings`}
                            className="w-100 text-center p-2 m-1 border-bottom border-top"
                        >
                            <MultiLang>Settings</MultiLang>
                        </Nav.Link>
                    </Col>
                )}
                <Col xs={9} className="d-flex align-items-center justify-content-center">
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
}
