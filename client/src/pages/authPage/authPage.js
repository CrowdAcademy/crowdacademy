import React, { useState } from 'react';
import './authPage.css';
import CrowdAcademyLogo from '../../assets/icon_tr.png';

export default function AuthPage() {
    // State to manage the current form (SignIn or SignUp)
    const [isSigningUp, setIsSigningUp] = useState(false);

    // State to manage form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle form input changes
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would typically send a request to your authentication service
        console.log('Form submitted:', { email, password });

        // Reset form fields
        setEmail('');
        setPassword('');
    };

    // Toggle between SignIn and SignUp forms
    const toggleAuthMode = () => {
        setIsSigningUp(!isSigningUp);
    };

    return (
        <div className="auth-container">
            <img src={CrowdAcademyLogo} alt="logo-image" width="40px" />
            <h2>{isSigningUp ? 'Sign Up on our Platform' : 'Sign in on our Platform'}</h2>
            <form onSubmit={handleSubmit}>
                <p className='Email-Label'>Email address</p>
                <input
                    type="email"
                    name="emailField"
                    value={email}
                    onChange={handleEmailChange}
                />
                <div className="pwd-labels-container">
                    <p>Password</p>
                    {!isSigningUp && <a href="#">Forgot password?</a>}
                </div>
                <input
                    type="password"
                    name="passwordField"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <div>
                    <input type="submit" value={isSigningUp ? 'SIGN UP' : 'LOG IN'} className="submitButton" />
                </div>
                <p className="new-create-account">
                    {isSigningUp ? 'Already have an account? ' : 'New to the Platform? '}
                    <a href="#" onClick={toggleAuthMode}>{isSigningUp ? 'Sign in.' : 'Create an account.'}</a>
                </p>
            </form>
            <footer>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
            </footer>
        </div>
    );
}
