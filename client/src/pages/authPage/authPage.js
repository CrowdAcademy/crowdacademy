import './authPage.css';
import React, { useState, useEffect, useRef } from 'react';
import CrowdAcademyLogo from '../../assets/icon_tr.png';

export default function AuthPage() {
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const referrerRef = useRef();

    useEffect(() => {
        referrerRef.current = document.referrer;
    }, []);

    useEffect(() => {
        let timer;
        if (showSuccessMessage) {
            timer = setTimeout(() => {
                setShowSuccessMessage(false);
                toggleAuthMode();
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [showSuccessMessage]);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const isEmail = value.includes('@');

        if (name === 'email') {
            setEmail(value);
        }

        if (name === 'username') {
            setUsername(value);
        }

        if (name === 'identifier') {
            setIdentifier(value);
        }

        if (name === 'password') {
            setPassword(value);
        }

        if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }

        if (name === 'identifier' && isEmail) {
            setEmail(value);
            setUsername(value.split("@")[0]);
        }

        if (name === 'identifier' && !isEmail) {
            setUsername(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSigningUp) {
            if (!username) {
                setError('Please provide a username.');
                return;
            }
            if (!isValidEmail(email)) {
                setError('Please provide a valid email address.');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }
        }

        if (!username && !email && !identifier) {
            setError('Please provide username or email.');
            return;
        }

        if (!password) {
            setError('Please provide password.');
            return;
        }

        try {
            let formData = {};
            let url = '/login';

            if (isSigningUp) {
                formData = {
                    username,
                    email,
                    password,
                    confirmPassword,
                };
                url = '/account/create';
            } else {
                formData = {
                    identifier,
                    password
                };
            }

            formData.roles = ["student"];

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response:', data);

                if (data.success && data.token) {
                    // Store the token in localStorage
                    localStorage.setItem('token', data.token);
                    console.log(`Saved token to localStorage ${data.token}`);
                    // Redirect to the original page
                    window.location.href = "/account";
                } else {
                    // Handle unsuccessful login or signup
                    setError(data.message || 'Login failed.');
                }

                // Reset form fields and error state
                setIdentifier('');
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setError(null);

                if (isSigningUp) {
                    setShowSuccessMessage(true);
                }
            } else {
                // Handle server error
                const errorData = await response.json();
                setError(errorData.error || 'An error occurred while submitting the form.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while submitting the form.');
        }
    };

    const toggleAuthMode = () => {
        setIsSigningUp(!isSigningUp);
    };

    return (
        <div className="auth-container">
            <img className='logo' src={CrowdAcademyLogo} alt="logo-image" width="40px" />
            <h2>{isSigningUp ? 'Sign Up on our Platform' : 'Sign In on our Platform'}</h2>
            {showSuccessMessage && <p className="success-message">Success! You have signed up successfully.</p>}
            <form onSubmit={handleSubmit}>
                {!isSigningUp ? (
                    <p className="Email-Label">
                        <span>Username or Email</span>
                        <input type="text" name='identifier' value={identifier} onChange={handleInputChange} />
                    </p>
                ) : (
                    <p className="Email-Label">
                        <span>Username</span>
                        <input type="text" name="username" value={username} onChange={handleInputChange} />
                    </p>
                )}
                {isSigningUp && (
                    <p className="Email-Label">
                        <span>Email</span>
                        <input type="email" name="email" value={email} onChange={handleInputChange} />
                    </p>
                )}
                <div className="pwd-labels-container">
                    <p>Password</p>
                    {!isSigningUp && <a href="#">Forgot password?</a>}
                </div>
                <input type="password" name="password" value={password} onChange={handleInputChange} />
                {isSigningUp && (
                    <div>
                        <p>Confirm Password</p>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                {error && <p className="error-message">{error}</p>}
                <div>
                    <input type="submit" value={isSigningUp ? 'SIGN UP' : 'SIGN IN'} className="submitButton" />
                </div>
                <p className="new-create-account">
                    {isSigningUp ? 'Already have an account? ' : 'New to the Platform? '}
                    <a href="#" onClick={toggleAuthMode}>{isSigningUp ? 'Sign In.' : 'Create an account.'}</a>
                </p>
            </form>
            <footer>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
            </footer>
        </div>
    );
}
