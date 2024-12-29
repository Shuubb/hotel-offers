import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Flag from "react-world-flags";
import MultiLang from "./MultiLang";
import { useContext } from "react";
import LangContext from "../contexts/LangContext/LangContext";

export default function NavBar() {
    const { language, setLanguage } = useContext(LangContext);
    return (
        <Navbar expand="lg" className="bg-body-tertiary shadow-lg" style={{ zIndex: "999" }}>
            <Container>
                <Navbar.Brand className="p-2">
                    <Link to="/" className="logo">
                        Hotel Offers
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
                        <Nav.Link>
                            <Link to="contact">
                                <MultiLang>Contact Us</MultiLang>
                            </Link>
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
                        <Nav.Link>
                            <Link to="/auth/login">
                                <MultiLang>Log In</MultiLang>
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/auth/register">
                                <MultiLang>Sign Up</MultiLang>
                            </Link>
                        </Nav.Link>
                        <NavDropdown title={language} className="border rounded shadow-sm px-2">
                            <NavDropdown.Item onClick={() => setLanguage("GEO")} hidden={language === "GEO"}>
                                <span style={{ display: "inline-flex", alignItems: "center" }}>
                                    ქართული{" "}
                                    <Flag code="GE" style={{ height: "1.2rem" }} className="border rounded mx-2" />
                                </span>
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setLanguage("ENG")} hidden={language === "ENG"}>
                                <span style={{ display: "inline-flex", alignItems: "center" }}>
                                    English{" "}
                                    <Flag code="GB" style={{ height: "1.2rem" }} className="border rounded mx-2" />
                                </span>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
