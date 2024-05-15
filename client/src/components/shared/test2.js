import React from "react";
import LeftMainContainer from "./leftmaincontainer";
import SideBar from "./sidebar";

function Test2() {
    return(
        <div className="home-container">
            <LeftMainContainer section = "instructor"/>
            <SideBar />
        </div>
    )
}

export default Test2;