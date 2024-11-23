import { Container } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";

export default function DefaultLayout() {
    const [language, setLanguage] = useState("GEO");
    return (
        <div className="jumbotron">
            <NavBar language={language} setLanguage={setLanguage} />
            <Container>
                <Outlet context={{ language }} />
            </Container>
            <Footer />
        </div>
    );
}
