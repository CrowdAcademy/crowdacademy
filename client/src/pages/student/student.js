import React from "react";
import LeftMainContainer from "../../components/shared/leftmaincontainer";
import SideBar from "../../components/shared/sidebar";
import "./studenthp.css";


function StudentPage() {
    return(
        <div className="home-container">
            <LeftMainContainer section = "student"/>
            <SideBar />
        </div>
    )
}

export default StudentPage;