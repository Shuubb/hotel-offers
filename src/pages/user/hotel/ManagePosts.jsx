import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
export default function ManagePosts() {
    return (
        <Tabs defaultActiveKey="posts" id="justify-tab-example" className="mb-3 " justify>
            <Tab eventKey="posts" title="Posts">
                Tab content for Home
            </Tab>
            <Tab eventKey="addpost" title="Add Post">
                Tab content for Profile
            </Tab>
            <Tab eventKey="settings" title="Settings">
                Tab content for Profile
            </Tab>
        </Tabs>
    );
}
