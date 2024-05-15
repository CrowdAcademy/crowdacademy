import React from "react"

import NavBar from "./navbar"
import SectionContainer from "./sectioncontainer"
import Footer from "../footer"



function LeftMainContainer(props) {

    return(
        <div className="home-main-container">
            <NavBar />
            <SectionContainer section = {props.section}/>
            <Footer className="home-footer" />
        </div>
    )
}

export default LeftMainContainer;