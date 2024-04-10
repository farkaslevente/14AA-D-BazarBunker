import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './CSS/ProfilePage.css';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [editedUser, setEditedUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [favoriteAds, setFavoriteAds] = useState([]);
    const [isFavoriteModalOpen, setIsFavoriteModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`${process.env.REACT_APP_LOCAL}/users/${userId}`);
                setUser(response.data);
                setEditedUser(response.data);
                const favorites = response.data.favourites.split(' + ').filter(id => id !== '0');
                setFavoriteAds(favorites);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleFavoriteClick = (adId) => {
        navigate(`/hirdetes/${adId}`);
    };

    const handleFavoriteModalOpen = () => {
        setIsFavoriteModalOpen(true);
    };

    const handleFavoriteModalClose = () => {
        setIsFavoriteModalOpen(false);
    };

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
            localStorage.setItem('userName', editedUser.name);
            localStorage.setItem('userLocation', editedUser.location);
            localStorage.setItem('userPhone', editedUser.phone);
            setEditMode(false);
            alert('User data saved successfully!');
            window.location.reload();
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
                    {!editMode && <button onClick={() => navigate('/profilkepek')} className="profile-image-button">Válassz másik képet</button>}
                    <div className="profile-details">
                        <ul>
                            <li>
                                <label htmlFor="name">Felhasználónév:</label>
                                {editMode ? (
                                    <input className='rounded' style={{border: '1px solid gray'}} type="text" id="name" name="name" value={editedUser.name} onChange={handleInputChange} required />
                                ) : (
                                    <p style={{ fontStyle: 'italic' }}>{user.name}</p>
                                )}
                            </li>
                            <li>
                                <label htmlFor="email">Email cím:</label>
                                <p style={{ fontStyle: 'italic' }}>{user.email}</p>
                            </li>
                            <li>
                                <label htmlFor="location">Hely:</label>
                                {editMode ? (
                                    <input className='rounded' style={{border: '1px solid gray'}}  type="text" id="location" name="location" value={editedUser.location} onChange={handleInputChange} required />
                                ) : (
                                    <p style={{ fontStyle: 'italic' }}>{user.location}</p>
                                )}
                            </li>
                            <li>
                                <label htmlFor="phone">Telefonszám:</label>
                                {editMode ? (
                                    <input className='rounded' style={{border: '1px solid gray'}}  type="tel" id="phone" name="phone" value={editedUser.phone} onChange={handleInputChange} maxLength={11} minLength={11} required />
                                ) : (
                                    <p style={{ fontStyle: 'italic' }}>{user.phone}</p>
                                )}
                            </li>
                        </ul>
                        <div style={{textAlign: 'center'}}>
                            {editMode && <button onClick={() => (handleSave, navigate('/ujjelszo'))} style={{marginBottom: '20px', background: 'purple', border: '1px solid black'}}>Jelszó megváltoztatása</button>}
                        </div>
                        <div className="editbutton">
                            {editMode ? (
                                <>
                                    <div style={{textAlign: 'center'}}>
                                        <button onClick={handleSave} style={{marginRight: '5px'}}>Mentés</button>
                                        <button onClick={handleCancel} style={{background: 'red', color: 'black', border: '1px solid black', marginLeft: '5px'}}>Mégse</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="button-group1">
                                        <button onClick={handleEdit} style={{marginRight: '5px'}}>Adatok szerkesztése</button>
                                        {!editMode && <button style={{ background: 'cyan', color: 'black', border: '1px solid black', marginLeft: '5px' }} onClick={() => navigate('/sajathirdetesek')}>Saját hirdetések</button>}
                                    </div>
                                </>
                            )}
                            <div className="button-group2" style={{marginTop: '20px'}}>
                                {!editMode && <button style={{ background: 'green', color: 'black', border: '1px solid black', marginRight: '5px' }} onClick={handleFavoriteModalOpen}>Kedvencek</button>}
                                {!editMode && <button style={{ background: 'red', color: 'black', border: '1px solid black', marginLeft: '5px' }} onClick={handleDelete}>Felhasználó törlése</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isFavoriteModalOpen}
                onRequestClose={handleFavoriteModalClose}
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
                        border: '2px solid green',
                        borderRadius: '20px',
                    },
                }}
            >
                <h2>Kedvenc hirdetések</h2>
                {user.favourites === '0 +' ? (
                    <p>Még nincsenek hirdetések hozzáadva a kedvencekhez!</p>
                ) : (
                    <ul>
                        {favoriteAds.map((adId, index) => (
                            <li key={index} style={{ marginBottom: '10px' }}>
                                <a onClick={() => handleFavoriteClick(adId)} style={{ color: 'gray', cursor: 'pointer', fontSize: '20px' }}>hirdetes/{index === favoriteAds.length - 1 ? adId : `${adId}`}</a>
                            </li>
                        ))}
                    </ul>
                )}
                <div style={{ textAlign: 'center' }}><button onClick={handleFavoriteModalClose} style={{ background: 'red', border: '1px solid black', margin: 'auto', marginTop: '20px', width: '100px' }}>Bezárás</button></div>
            </Modal>
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
                <h2>Biztosan törölni szeretné a saját felhasználóját??</h2>
                <p>Ezzel hirdetéseit is törölni fogjuk!</p>
                <div style={{textAlign: 'center'}}>
                    <button onClick={confirmDelete} style={{ background: 'red', border: '1px solid black', color: 'black', marginRight: '5px' }}>Igen</button>
                    <button onClick={cancelDelete} style={{ background: 'blue', marginLeft: '5px' }}>Mégse</button>
                </div>
            </Modal>
        </div>
    );
};

export default ProfilePage;
