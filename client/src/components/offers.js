import React from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


export default function Offers(props) {
    const offerTitle = props.offerTitle;
    const offerImage = props.offerImage;
    const offerInsight = props.offerInsight;
    const className = props.className

    return(
        <div className = {`offer ${className}`}>
            <div className = "offer-container-left"> 
                <img src = {offerImage} alt = "image-1" />
            </div>
            <div className = "offer-right-container">
                <div className = "offer-insight-container">
                    <h3>
                        {offerTitle}
                    </h3>
                    <p>
                        {offerInsight}
                    </p>
                </div>
                <button>Explore <FontAwesomeIcon icon = {faArrowRight} className = "explore-icon"/></button>
            </div>
        </div>
    )
}