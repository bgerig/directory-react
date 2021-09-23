import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = (props) => {
    const { children, isSidebarOpen, title } = props;

    return (
        <div className={`app-container ${isSidebarOpen ? "w-sidebar-open" : ""}`}>
            <Header />
            <div className="main">
                <Sidebar />
                <div className="content">
                    <div className="page-title">
                        <h2>{title}</h2>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        isSidebarOpen: state.tools.sidebar === "open",
    };
};

export default connect(mapStateToProps)(Layout);
