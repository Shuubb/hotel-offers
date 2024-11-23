import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export default function AdminLayout() {
    return (
        <div className="d-flex vh-100 vw-100">
            <Sidebar />
            <Outlet />
        </div>
    );
}
