import React from "react";
import LeftMainContainer from "./leftmaincontainer";
import SideBar from "./sidebar";

function Test() {
    return(
        <div className="home-container">
            <LeftMainContainer section = "student"/>
            <SideBar />
        </div>
    )
}

export default Test;