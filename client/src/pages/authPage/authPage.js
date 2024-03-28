import React, { useState } from 'react';
import './authPage.css';
import CrowdAcademyLogo from '../../assets/icon_tr.png';

export default function AuthPage() {
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

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
            const formData = {
                username,
                email,
                password,
                confirmPassword,
            };
    
            let url = '/login';
            if (isSigningUp) {
                url = '/users/register';
            }
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
            console.log('Response:', data);
    
            // Reset form fields and error state
            setIdentifier('');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setError(null);
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
            <img src={CrowdAcademyLogo} alt="logo-image" width="40px" />
            <h2>{isSigningUp ? 'Sign Up on our Platform' : 'Sign In on our Platform'}</h2>
            <form onSubmit={handleSubmit}>
                {
                    !isSigningUp ? (
                        <p className="Email-Label">
                            <span>Username or Email</span>
                            <input type="text" name='identifier' value={identifier} onChange={handleInputChange} />
                        </p>
                    ) : (
                        <p className="Email-Label">
                            <span>Username</span>
                            <input type="text" name="username" value={username} onChange={handleInputChange} />
                        </p>
                    )
                }
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
