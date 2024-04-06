import React, { useState, useEffect } from 'react';
import './CSS/ProfilePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [editedUser, setEditedUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`${process.env.REACT_APP_LOCAL}/users/${userId}`);
                setUser(response.data);
                setEditedUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditedUser(user);
        setEditMode(false);
    };

    const handleSave = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const headers = {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            };
            await axios.put(`${process.env.REACT_APP_LOCAL}/users/patch`, editedUser, { headers });
            setUser(editedUser);
            setEditMode(false);
            alert('User data saved successfully!');
        } catch (error) {
            console.error('Error saving user data:', error);
            alert('Failed to save user data. Please try again.');
        }
    };

    const handleDelete = async () => {
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const headers = {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            };
            await axios.delete(`${process.env.REACT_APP_LOCAL}/users/delete`, { headers });
            alert('User deleted successfully!');
            localStorage.clear();
            localStorage.setItem('isLoggedIn', false);
            navigate('/');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user. Please try again.');
        }
        setIsDeleteModalOpen(false);
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className='profilepage'>
            <div className="profile">
                <div className="profile-header">
                    <h1>Profil</h1>
                </div>
                <div className="profile-content">
                    <img src={user.pPic} alt="Profile Image" className="profile-image" />
                    <div className="profile-details">
                        <ul>
                            <li>
                                <label htmlFor="name">Felhasználónév:</label>
                                {editMode ? (
                                    <input type="text" id="name" name="name" value={editedUser.name} onChange={handleInputChange} />
                                ) : (
                                    <p style={{fontStyle: 'italic'}}>{user.name}</p>
                                )}
                            </li>
                            <li>
                                <label htmlFor="email">Email cím:</label>
                                {editMode ? (
                                    <input type="email" id="email" name="email" value={editedUser.email} onChange={handleInputChange} />
                                ) : (
                                    <p style={{fontStyle: 'italic'}}>{user.email}</p>
                                )}
                            </li>
                            <li>
                                <label htmlFor="location">Hely:</label>
                                {editMode ? (
                                    <input type="text" id="location" name="location" value={editedUser.location} onChange={handleInputChange} />
                                ) : (
                                    <p style={{fontStyle: 'italic'}}>{user.location}</p>
                                )}
                            </li>
                            <li>
                                <label htmlFor="phone">Telefonszám:</label>
                                {editMode ? (
                                    <input type="tel" id="phone" name="phone" value={editedUser.phone} onChange={handleInputChange} />
                                ) : (
                                    <p style={{fontStyle: 'italic'}}>{user.phone}</p>
                                )}
                            </li>
                        </ul>
                        <div className="editbutton">
                            {editMode ? (
                                <>
                                    <button onClick={handleSave}>Mentés</button>
                                    <button onClick={handleCancel}>Mégse</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={handleEdit}>Adatok szerkesztése</button>
                                </>
                            )}
                            {!editMode && <button style={{background: 'cyan', color: 'black', border: '1px solid black'}} onClick={() => navigate('/sajathirdetesek')}>Saját hirdetések</button>}
                            {!editMode && <button style={{background: 'red', color: 'black', border: '1px solid black'}} onClick={handleDelete}>Felhasználó törlése</button>}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={cancelDelete}
                style={{
                    overlay: {
                        zIndex: 1000,
                    },
                    content: {
                        width: 'fit-content',
                        height: 'fit-content',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: '2px solid red',
                        borderRadius: '20px',
                    },
                }}
            >
                <h2>Biztosan törölni szeretné a felhasználót?</h2>
                <p>Ha igen, akkor hirdetéseit is törölni fogjuk!</p>
                <button onClick={confirmDelete} style={{background: 'red'}}>Igen</button>
                <button onClick={cancelDelete} style={{background: 'blue'}}>Mégse</button>
            </Modal>
        </div>
    );
};
