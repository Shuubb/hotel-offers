import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import Flag from "react-world-flags";
import { MultiLang } from "ds-auth-provider";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "ds-auth-provider";
import useLocalStorage from "use-local-storage";
import { BsPerson } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";

export default function NavBar() {
    const { language, setLanguage } = useContext(LangContext);
    const [jwt, setJwt] = useLocalStorage("jwt", localStorage.getItem("jwt"));
    const [user, setUser] = useState(jwt ? jwtDecode(jwt) : { role: "guest" });

    useEffect(() => {
        setUser(jwt ? jwtDecode(jwt) : { role: "guest" });
    }, [jwt]);
    return (
        <Navbar expand="lg" style={{ zIndex: "999" }}>
            <Container>
                <Navbar.Brand as={Link} to="/" className="p-2 logo">
                    Hotel Offers
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
                        <Nav.Link as={Link} to="contact">
                            <MultiLang>Contact Us</MultiLang>
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
                        {user.role === "guest" && (
                            <>
                                <Nav.Link as={Link} to="/auth/login">
                                    <MultiLang>Log In</MultiLang>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/auth/register">
                                    <MultiLang>Sign Up</MultiLang>
                                </Nav.Link>
                            </>
                        )}
                        {(user.role === "user" || user.role === "hotel") && (
                            <NavDropdown title={<BsPerson />} className="">
                                <Nav.Link as={Link} to={`/profile/${user.userId}`}>
                                    <MultiLang>Profile</MultiLang>
                                </Nav.Link>
                                <hr className="m-1 mx-2" />
                                <NavDropdown.Item onClick={() => setJwt(null)}>
                                    <span style={{ display: "inline-flex", alignItems: "center" }}>Log Out</span>
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}

                        <NavDropdown title={language}>
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
