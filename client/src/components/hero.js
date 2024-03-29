import React from "react"

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faKeyboard} from '@fortawesome/free-solid-svg-icons'
import {faImage} from '@fortawesome/free-solid-svg-icons'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'


export default function Hero() {
	return(
		<section>
            <h1><span>Our aim</span>, help you as much as possible.</h1>
            <div className = "large-input-container">
                <div>
                    <textarea name = "" id = "" cols = "100" rows = "7" placeholder = "Ask your question right away"></textarea>
                </div>
                <div className = "textarea-icons-container">
                    <div className = "textarea-input-icons">
                        <a href = ""><FontAwesomeIcon icon = {faKeyboard} className = "icon-black-color"/></a>
                        <a href = ""><FontAwesomeIcon icon = {faImage} className = "icon-black-color"/></a>
                    </div>
                    <a href = "" className = "question-submit-icon"><FontAwesomeIcon icon = {faArrowRight} className = "icon-black-color"/></a>
                </div>
            </div>
        </section>
	)
};