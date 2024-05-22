import React from "react"

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faKeyboard} from '@fortawesome/free-solid-svg-icons'
import {faImage} from '@fortawesome/free-solid-svg-icons'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import CoreHero from "./corehero"


export default function Hero() {
	return(
		<section className="hero-section">
            <h1><span>Our aim</span>, help you as much as possible.</h1>
            <CoreHero />
        </section>
	)
};