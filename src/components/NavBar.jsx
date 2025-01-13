import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Offcanvas, Row, Col, Dropdown, DropdownButton } from "react-bootstrap";
import Flag from "react-world-flags";
import { MultiLang, UserContext, LangContext } from "ds-auth-provider";
import { BsPerson } from "react-icons/bs";

export default function NavBar() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const { language, setLanguage } = useContext(LangContext);
    const { logout, user } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleCloseOffcanvas = () => setShowOffcanvas(false);

    const handleNavigation = (path) => {
        handleCloseOffcanvas();
        navigate(path);
    };

    return (
        <Navbar expand="lg" style={{ zIndex: "999" }}>
            <Container>
                <Navbar.Brand as={Link} to="/" className="p-2 logo text-wrap text-center" style={{ maxWidth: "30vw" }}>
                    Hotel Offers
                </Navbar.Brand>
                <Navbar.Offcanvas
                    show={showOffcanvas}
                    onHide={handleCloseOffcanvas}
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="me-auto my-2 my-lg-0" variant="underline">
                            <Nav.Link
                                as="button"
                                onClick={() => handleNavigation("/contact")}
                                className="p-2"
                                active={location.pathname === "/contact"}
                            >
                                <MultiLang>Contact Us</MultiLang>
                            </Nav.Link>
                        </Nav>
                        <Nav
                            className="ms-auto my-2 my-lg-0 align-items-center d-flex justify-content-around flex-row"
                            variant="underline"
                        >
                            <Row className="w-100 align-items-center justify-content-center flex-row flex-nowrap text-nowrap">
                                <Col className="justify-content-center d-flex">
                                    {!user && (
                                        <>
                                            <Nav.Link
                                                as="button"
                                                onClick={() => handleNavigation("/auth/login")}
                                                className="p-2"
                                            >
                                                <MultiLang>Log In</MultiLang>
                                            </Nav.Link>
                                            <Nav.Link
                                                as="button"
                                                onClick={() => handleNavigation("/auth/register")}
                                                className="p-2"
                                            >
                                                <MultiLang>Sign Up</MultiLang>
                                            </Nav.Link>
                                        </>
                                    )}

                                    {user && (
                                        <DropdownButton
                                            id="dropdown-item-button"
                                            className="top-main"
                                            variant="underline"
                                            title={<BsPerson />}
                                            flip
                                        >
                                            {user.role === "hotel" && (
                                                <Dropdown.Item as="button" onClick={() => handleNavigation("/manage")}>
                                                    <MultiLang>Manage Posts</MultiLang>
                                                </Dropdown.Item>
                                            )}
                                            <Dropdown.Item
                                                as="button"
                                                onClick={() => handleNavigation(`/profile/${user.userId}`)}
                                            >
                                                <MultiLang>Profile</MultiLang>
                                            </Dropdown.Item>
                                            <hr className="m-1 mx-2" />

                                            <Dropdown.Item as="button" onClick={() => logout()}>
                                                <MultiLang>Log Out</MultiLang>
                                            </Dropdown.Item>
                                        </DropdownButton>
                                    )}
                                </Col>
                                <Col
                                    className="justify-content-center d-flex border rounded p-0 me-4 pointer"
                                    style={{
                                        minWidth: "45px",
                                        maxWidth: "45px",
                                        height: "fit-content",
                                        overflow: "hidden",
                                    }}
                                >
                                    <Flag
                                        code={language === "GEO" ? "GB" : "GE"}
                                        onClick={() => setLanguage(language === "GEO" ? "ENG" : "GEO")}
                                        style={{ width: "45px" }}
                                    />
                                </Col>
                            </Row>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

                <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={() => setShowOffcanvas(!showOffcanvas)} />
            </Container>
        </Navbar>
    );
}
