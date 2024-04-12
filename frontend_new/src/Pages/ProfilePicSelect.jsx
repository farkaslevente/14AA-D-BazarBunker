import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePicCard from '../Components/ProfilePicCard/ProfilePicCard';
import Modal from 'react-modal';
import './CSS/ProfilePicSelect.css';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

export const ProfilePicSelect = () => {
    const [pictures, setPictures] = useState([]);
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPictures = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const headers = {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                };
                const response = await axios.get(`${process.env.REACT_APP_LOCAL}/pictures`, { headers });
                setPictures(response.data);
            } catch (error) {
                console.error('Error fetching pictures:', error);
            }
        };
        fetchPictures();
    }, []);

    const openModal = (url) => {
        setSelectedPicture(url);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPicture(null);
        setIsModalOpen(false);
    };

    const confirmChange = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const headers = {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            };
            await axios.post(`${process.env.REACT_APP_LOCAL}/users/changepicture`, { pPic: selectedPicture }, { headers });
            console.log('Profile picture change confirmed');

            // Update localStorage with the selected picture URL
            localStorage.setItem('userPPic', selectedPicture);
            closeModal(); // Close the modal after successful change
    
            // Update profile picture link in the navbar
            const profilePicLink = document.getElementById('profilePicLink');
            if (profilePicLink) {
                profilePicLink.setAttribute('href', selectedPicture);
            }
            navigate("/profil");
            window.location.reload();
        } catch (error) {
            console.error('Error confirming picture change:', error);
        }
    };

    return (
        <div className="profilepic-select">
            <h1 className="text-center">Válasszon másik profilképet!</h1>
            <div className="picture-options">
                {pictures.map((picture, index) => (
                    <ProfilePicCard key={index} url={picture.url} onClick={() => openModal(picture.url)} /> 
                ))}
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Erősítse meg a változtatást!" 
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
                }}>
                <div style={{textAlign: 'center'}}>
                    <h2>Erősítse meg a profilkép változtatást!</h2>
                    {selectedPicture && <img src={selectedPicture} alt="Selected Profile Pic" style={{width: '20%', height: '20%'}}/>}
                    <div className="modal-buttons">
                        <button onClick={confirmChange}>Mentés</button>
                        <button onClick={closeModal} style={{background: 'red', border: '1px solid black'}}>Mégse</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ProfilePicSelect;
