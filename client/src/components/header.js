import React from "react"

import CrowdAcademyLogo from '../assets/logo-sample.png'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faKeyboard} from '@fortawesome/free-solid-svg-icons'
import {faImage} from '@fortawesome/free-solid-svg-icons'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'


export default function Header() {
	return(
		<header>
            <div className = "header-top-container">
                <div>
                    <img src = {CrowdAcademyLogo} alt = "rafini" width = "40px" />
                    <h3 className = "logo-text">Crowd Academy</h3>
                </div>
                <div>
                    <button className = "instructor-button">Instructor</button>
                    <button className = "get-started-button">Get started</button>
                </div>
            </div>
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
        </header>
	)
};