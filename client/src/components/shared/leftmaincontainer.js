import React from "react";
import NavBar from "./navbar";
import SectionContainer from "./sectioncontainer";
import Footer from "../footer";
import SideBar from "./sidebar";



const LeftMainContainer = ({ children }) => {
    return (
        <div className="home-container">
            <div className="home-main-container">
                <NavBar />
                <SectionContainer>
                    {children}
                </SectionContainer>
                <Footer className="home-footer" />
            </div>
            <SideBar />
        </div>
    );
};

export default LeftMainContainer;
