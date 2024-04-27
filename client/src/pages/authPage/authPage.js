import React from 'react';

import './authPage.css'

import CrowdAcademyLogo from '../../assets/icon_tr.png'


export default function AuthPage() {
	return(
		<div className = "auth-container">
			<img src = {CrowdAcademyLogo} alt = "logo-image" width = "40px" />
            <h2>Sign in on our Platform</h2>
            <form action = "">
                <p className = 'Email-Label'>Email address</p>
                <input type = "email" name = "emailField" />
                <div className = "pwd-labels-container">
                    <p>Password</p>
                    <a href = "">Forgot password?</a>
                </div>
                <input type = "password" name = "passwordField" />
                <div>
                    <input type = "submit" value = "LOG IN" className = "submitButton" />
                </div>
                <p className = "new-create-account">New to the Platform? <a href = "">Create an account.</a></p>
            </form>
            <footer>
                <a href="">Privacy</a>
                <a href="">Terms</a>
            </footer>
		</div>
	)
}

