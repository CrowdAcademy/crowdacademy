import React from "react";

import Image1 from '../assets/image1.png'
import Image2 from '../assets/image2.png'
import Image3 from '../assets/image3.png'

import {faBook} from '@fortawesome/free-solid-svg-icons'
import {faCreativeCommonsZero} from '@fortawesome/free-brands-svg-icons'
import {faEye} from '@fortawesome/free-solid-svg-icons'

import Values from "./values";
import Offers from "./offers";


export default function Main() {
    return(
        <main>
            <div  className = "main-h2-headers">
                <div>
                    <h2>Values</h2>
                </div>
            </div>
            <article className = "values">
                <Values className = "value-1" iconClassName = "fa-solid" value = "True Learning and Understanding." icon = {faBook} />
                <Values className = "value-2" iconClassName = "fa-brands" value = "Zero Plagiarism and Academy Honesty." icon = {faCreativeCommonsZero}/>
                <Values className = "value-3" iconClassName = "fa-solid" value = "Student-Focused Learning." icon = {faEye}/>
            </article>

            <hr className = "hr-2" />

            <div className = "main-h2-headers">
                <div>
                    <h2>Offers</h2>
                </div>
            </div>
            <article className = "offers">
                <Offers className = "offer-1 A" offerImage = {Image1} offerTitle = "Lorem ipsum dolor sit." offerInsight = "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Qui molestias quaerat sunt.Lorem ipsum dolor sit amet consectetur adipisicing elit."/>
                <Offers className = "offer-2" offerImage = {Image2} offerTitle = "Lorem ipsum dolor sit." offerInsight = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui molestias quaerat sunt."/>
                <Offers className = "offer-3" offerImage = {Image3} offerTitle = "Lorem ipsum dolor sit." offerInsight = "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Qui molestias quaerat sunt. Lorem ipsum dolor sit amet consectetur adipisicing elit."/>
            </article>

            <hr className = "hr-3" />

            <div className = "main-h2-headers">
                <div>
                    <h2>Join us</h2>
                </div>
            </div>
            <article className = "login-in">
<<<<<<< HEAD
                <form action = "" className = "log-in-form">
=======
                <form action = "" class = "log-in-form">
>>>>>>> 6fd99c18e3c35c8f2f50c57cba1d9fe9bf6a496f
                    <p>Username</p>
                    <input type = "text" className = "username-input" placeholder = "username" />
                    <p>Password</p>
                    <input type = "password" className = "pwd-input" placeholder = "password" />
                    <div className = "submit-btn-container">
                        <input type = "submit" className = "SIGN-IN" value = "SIGN IN" />
                    </div>
                    <p>New here? <a href = "">Join</a></p>
                </form>
            </article>
        </main>
    )
}