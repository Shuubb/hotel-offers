import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { MultiLang } from "ds-auth-provider";
export default function ProfilePage() {
    return (
        <Tabs defaultActiveKey="posts" id="justify-tab-example" className="mb-3 " justify>
            <Tab eventKey="posts" title={<MultiLang>Preview</MultiLang>}>
                Tab content for Home
            </Tab>

            <Tab eventKey="settings" title={<MultiLang>Settings</MultiLang>}>
                Tab content for Profile
            </Tab>
        </Tabs>
    );
}
