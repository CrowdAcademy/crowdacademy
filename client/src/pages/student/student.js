import React from "react";
import LeftMainContainer from "../../components/shared/leftmaincontainer";
import SideBar from "../../components/shared/sidebar";

function Test() {
    return(
        <div className="home-container">
            <LeftMainContainer section = "student"/>
            <SideBar />
        </div>
    )
}

export default Test;