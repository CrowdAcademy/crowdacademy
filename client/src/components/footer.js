import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return(
        <footer>
            <p>&copy; Crowd-Academy, org</p>
            <a href = "">privacy & terms</a>
            <div className = "footer-contact-icons">
                <a href = ""><FontAwesomeIcon icon = {faLinkedin} className = "fa-brands"/></a>
                <a href = ""><FontAwesomeIcon icon = {faEnvelope} className = "fa-solid"/></a>
                <a href = ""><FontAwesomeIcon icon = {faFacebook} className = "fa-brands"/></a>
            </div>
        </footer>
    )
};