import './AccountDetails.css';
import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { FaChevronDown, FaChevronUp, FaCopy } from 'react-icons/fa'; 
import { formatString } from "../../utils/string";



export default function AccountDetails() {
    const { user, loading } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
    const [isTokenShowing, setIsTokenShowing] = useState(false);
    const [isAddingPayment, setIsAddingPayment] = useState(false);
    const [paymentType, setPaymentType] = useState('credit card');
    const [isCopied, setIsCopied] = useState(false); // State to track if token is copied

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const togglePermissions = () => {
        setIsPermissionsOpen(!isPermissionsOpen);
    };

    const toggleToken = () => {
        setIsTokenShowing(!isTokenShowing);
    };

    const toggleAddPayment = () => {
        setIsAddingPayment(!isAddingPayment);
    };

    const handlePaymentTypeChange = (event) => {
        setPaymentType(event.target.value);
    };

    const copyTokenToClipboard = () => {
        navigator.clipboard.writeText(user.token.current_token);
        setIsCopied(true); // Set copied state to true
        setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
    };

    if (loading) {
        return <p className="loading">Loading user data...</p>;
    }

    return user ? (
        <div className="account-details-container">
            <div className="info-card">
                <h1>Welcome, {formatString(user.username)}</h1>
            </div>

            <div className="info-card">
                <h2>Profile</h2>
                <div className="avatar-container">
                    {user.profile?.avatar && <img src={user.profile.avatar} alt="Avatar" className="avatar" onClick={toggleEdit} />}
                    <p>{user.username}</p>
                </div>
                <hr />
                {isEditing ? (
                    <div className="edit-profile-form">
                        <label>
                            Avatar:
                            <input type="file" className="upload-avatar" />
                        </label>
                        <label>
                            Full Name:
                            <input type="text" defaultValue={user.profile?.full_name || ''} />
                        </label>
                        <label>
                            Bio:
                            <textarea defaultValue={user.profile?.bio || ''}></textarea>
                        </label>
                        <label>
                            Location:
                            <input type="text" defaultValue={user.profile?.location || ''} />
                        </label>
                        <label>
                            Contact Number:
                            <input type="text" defaultValue={user.profile?.contact_number || ''} />
                        </label>
                        <button onClick={toggleEdit} className="save-btn">Save</button>
                    </div>
                ) : (
                    <div className="profile-details">
                        <p><strong>Full Name:</strong> <span>{user.profile?.full_name || 'You have not set Full Name yet'}</span></p>
                        <p><strong>Bio:</strong> <span>{user.profile?.bio || 'You have not set Bio yet'}</span></p>
                        <p><strong>Location:</strong> <span>{user.profile?.location || 'You have not set Location yet'}</span></p>
                        <p><strong>Contact Number:</strong> <span>{user.profile?.contact_number || 'You have not set Contact Number yet'}</span></p>
                        <button className="edit-profile-btn" onClick={toggleEdit}>Edit Profile</button>
                    </div>
                )}
            </div>

            <div className={`info-card permissions-card collapsible ${isPermissionsOpen ? 'open' : ''}`}>
                <h2 onClick={togglePermissions}>
                    Permissions {isPermissionsOpen ? <FaChevronUp /> : <FaChevronDown />}
                </h2>
                <ul>
                    {user.permissions.map((permission, index) => (
                        <li className='permission' key={index}>Can {formatString(permission)}</li>
                    ))}
                </ul>
            </div>

            <div className="info-card">
                <h2>Activity</h2>
                <div className="activity-details">
                    <p><strong>Lessons Created:</strong> <span>{user.lessons_created.length}</span></p>
                    <p><strong>Lessons Enrolled:</strong> <span>{user.lessons_enrolled.length}</span></p>
                    <p><strong>Challenges Created:</strong> <span>{user.challenges_created.length}</span></p>
                    <p><strong>Challenges Solved:</strong> <span>{user.challenges_solved.length}</span></p>
                </div>
            </div>

            <div className="info-card">
                <h2>Payment Methods</h2>
                <p>{user.payment_methods.length ? user.payment_methods.join(', ') : 'No payment methods available'}</p>
                <button className="add-payment-btn" onClick={toggleAddPayment}>Add Payment Method</button>
                {isAddingPayment && (
                    <div className="add-payment-form">
                        <label>
                            Payment Method:
                            <select value={paymentType} onChange={handlePaymentTypeChange}>
                                <option value="credit card">Credit Card</option>
                                <option value="paypal">PayPal</option>
                            </select>
                        </label>
                        {paymentType === 'credit card' && (
                            <>
                                <label>
                                    Card Number:
                                    <input type="text" />
                                </label>
                                <label>
                                    Expiration Date:
                                    <input type="text" />
                                </label>
                                <label>
                                    CVV:
                                    <input type="text" />
                                </label>
                            </>
                        )}
                        {paymentType === 'paypal' && (
                            <label>
                                PayPal Email:
                                <input type="email" />
                            </label>
                        )}
                        <button className="save-btn">Save</button>
                    </div>
                )}
            </div>

            <div className="info-card">
                <h2>Payments</h2>
                <p>{user.payments.length ? user.payments.join(', ') : 'No payments available'}</p>
            </div>

            <div className={`info-card collapsible ${isTokenShowing ? 'open' : ''}`}>
                <h2 onClick={toggleToken}>
                    Token {isTokenShowing ? <FaChevronUp /> : <FaChevronDown />}
                </h2>
                <p>
                    <span className="token">{user.token.current_token}</span>
                    <button onClick={copyTokenToClipboard} className='copy-btn'>
                        {isCopied ? 'Copied!' : <FaCopy />}
                    </button>
                </p>
            </div>

        </div>
    ) : (
        <p className="no-data">No user data available.</p>
    );
}
