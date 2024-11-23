import React from "react";
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const links = [
    { name: "Manage Posts", icon: "columns", path: "/admin/posts" },
    { name: "Manage Profiles", icon: "user", path: "/admin/profiles" },
    { name: "Analytics", icon: "chart-line", path: "/admin/analytics" },
];

function Sidebar() {
    let location = useLocation();
    return (
        <CDBSidebar textColor="#fff" className="rounded shadow-lg bg-dark">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large my-3"></i>}>
                <div className="logo fs-5 m-0 p-2">Hotel Offers</div>
            </CDBSidebarHeader>
            <CDBSidebarContent>
                <CDBSidebarMenu>
                    {links.map((link) => (
                        <NavLink to={link.path}>
                            <CDBSidebarMenuItem
                                icon={link.icon}
                                className={`w-100 m-0 my-1 p-1 btn btn-${
                                    location.pathname === link.path ? "primary" : "secondary"
                                }`}
                                role="button"
                                data-bs-toggle="button"
                            >
                                {link.name}
                            </CDBSidebarMenuItem>
                        </NavLink>
                    ))}
                </CDBSidebarMenu>
            </CDBSidebarContent>
        </CDBSidebar>
    );
}

export default Sidebar;
