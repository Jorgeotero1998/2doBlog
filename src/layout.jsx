import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

const Layout = () => {
    return (
        <div className="d-flex flex-column h-100">
            <Navbar />
            <div className="container flex-grow-1">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
