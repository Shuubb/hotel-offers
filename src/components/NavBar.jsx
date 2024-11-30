import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Flag from "react-world-flags";

export default function NavBar({ language, setLanguage }) {
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
                            <Link to="contact">{language === "GEO" ? "დაგვიკავშირდით" : "Contact Us"}</Link>
                        </Nav.Link>
                    </Nav>
                    <NavDropdown title={language}>
                        <NavDropdown.Item onClick={() => setLanguage("GEO")} hidden={language === "GEO"}>
                            <span style={{ display: "inline-flex", alignItems: "center" }}>
                                ქართული <Flag code="GE" style={{ height: "1.2rem" }} className="border rounded mx-2" />
                            </span>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setLanguage("ENG")} hidden={language === "ENG"}>
                            <span style={{ display: "inline-flex", alignItems: "center" }}>
                                English <Flag code="GB" style={{ height: "1.2rem" }} className="border rounded mx-2" />
                            </span>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
