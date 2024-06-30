import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../context/UserContext';
import avatarDefault from '../assets/avatar-default.svg';

const LessonCard = ({ id, title, description, profilePhoto, userId, fetchLessons }) => {
    const { user } = useUser();

    const handleDelete = async () => {
        if (user && user.token) {
            const confirmDelete = window.confirm(`Are you sure you want to delete this lesson with id: ${id}?`);
            if (confirmDelete) {
                try {
                    const response = await fetch(`/lessons/delete/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${user.token.current_token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        alert(`Lesson with id: ${id} has been deleted.`);
                        fetchLessons();
                    } else {
                        const errorData = await response.json();
                        console.error('Failed to delete lesson:', errorData);
                        alert('Failed to delete lesson.');
                    }
                } catch (error) {
                    console.error('Error deleting lesson:', error);
                    alert('Error deleting lesson.');
                }
            }
        } else {
            alert('You do not have permission to delete this lesson.');
        }
    };

    return (
        <div className="lesson-container">
            <div className="user-info-container">
                <img src={profilePhoto ? profilePhoto : avatarDefault} alt="Profile" className="profile-photo" />
                <div>
                    <p>{userId}</p>
                </div>
            </div>

            <div className='lesson-card-content'>
                <Link to={`/lesson/${id}`} className="lesson-link">
                    <p>{title}</p>
                </Link>
                <p>{description}</p>
            </div>

            {user && user.token && user.permissions.includes('delete_lesson') && (
                <button className="delete-button" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            )}
        </div>
    );
}


export default LessonCard;
