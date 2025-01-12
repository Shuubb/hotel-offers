import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import Flag from "react-world-flags";
import { MultiLang, UserContext, LangContext } from "ds-auth-provider";
import { useContext } from "react";
import { BsPerson } from "react-icons/bs";
import { Col, Dropdown, DropdownButton, Row } from "react-bootstrap";

export default function NavBar() {
    const { language, setLanguage } = useContext(LangContext);
    const { logout, user } = useContext(UserContext);

    return (
        <Navbar expand="lg" style={{ zIndex: "999" }}>
            <Container>
                <Navbar.Brand as={Link} to="/" className="p-2 logo text-wrap text-center" style={{ maxWidth: "30vw" }}>
                    Hotel Offers
                </Navbar.Brand>
                <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="me-auto my-2 my-lg-0">
                            <Nav.Link as={Link} to="contact">
                                <MultiLang>Contact Us</MultiLang>
                            </Nav.Link>
                        </Nav>
                        <Nav className="ms-auto my-2 my-lg-0 align-items-center d-flex justify-content-around flex-row">
                            <Row className="w-100 align-items-center justify-content-center flex-row flex-nowrap text-nowrap">
                                <Col className="justify-content-center d-flex ">
                                    {!user && (
                                        <>
                                            <Nav.Link as={Link} to="/auth/login">
                                                <MultiLang>Log In</MultiLang>
                                            </Nav.Link>
                                            <Nav.Link as={Link} to="/auth/register">
                                                <MultiLang>Sign Up</MultiLang>
                                            </Nav.Link>
                                        </>
                                    )}

                                    {user && (
                                        <DropdownButton
                                            id="dropdown-item-button"
                                            className="top-main"
                                            title={<BsPerson />}
                                            flip
                                        >
                                            {user.role === "hotel" && (
                                                <Dropdown.Item as={Link} to={"/manage"}>
                                                    <MultiLang>Manage Posts</MultiLang>
                                                </Dropdown.Item>
                                            )}
                                            <Dropdown.Item as={Link} to={`/profile/${user.userId}`}>
                                                <MultiLang>Profile</MultiLang>
                                            </Dropdown.Item>
                                            <hr className="m-1 mx-2" />

                                            <Dropdown.Item as="button" onClick={() => logout()}>
                                                <MultiLang>Log Out</MultiLang>
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    )}
                                </Col>
                                <Col className="justify-content-center d-flex">
                                    <Flag
                                        code={language === "GEO" ? "GB" : "GE"}
                                        onClick={() => setLanguage(language === "GEO" ? "ENG" : "GEO")}
                                        style={{ width: "45px", height: "fit-content" }}
                                        className="border rounded mx-2 pointer"
                                    />
                                </Col>
                            </Row>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

                <Navbar.Toggle aria-controls="offcanvasNavbar" />
            </Container>
        </Navbar>
    );
}
