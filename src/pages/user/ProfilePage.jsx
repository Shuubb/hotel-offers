import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Nav } from "react-bootstrap/esm";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { MultiLang } from "ds-auth-provider";
import useLocalStorage from "use-local-storage";
import { jwtDecode } from "jwt-decode";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function ProfilePage() {
    const { clientId } = useLoaderData();
    const [jwt, setJwt] = useLocalStorage("jwt", localStorage.getItem("jwt"));
    const user = jwt ? jwtDecode(jwt) : { role: "guest" };
    return (
        <Tabs defaultActiveKey="preview" id="justify-tab-example" className="mb-3 " justify>
            <Tab eventKey="preview" title="Preview">
                Tab content for Home
            </Tab>
            <Tab eventKey="posts" title="Posts">
                Tab content for Profile
            </Tab>
            <Tab eventKey="settings" title="Settings">
                Tab content for Profile
            </Tab>
        </Tabs>
    );
}
