import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePicCard from '../Components/ProfilePicCard/ProfilePicCard';
import Modal from 'react-modal'; // Import React_Modal from react-modal
import './CSS/ProfilePicSelect.css';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // Set the root element for accessibility

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
            await axios.post(`${process.env.REACT_APP_LOCAL}/pictures`, { pPic: selectedPicture }, { headers });
            console.log('Profile picture change confirmed');
            // Update localStorage with the selected picture URL
            localStorage.setItem('userPPic', selectedPicture);
            closeModal(); // Close the modal after successful change
    
            // Update profile picture link in the navbar
            const profilePicLink = document.getElementById('profilePicLink');
            if (profilePicLink) {
                profilePicLink.setAttribute('href', selectedPicture);
            }
            window.location.reload();
            navigate("/profil");
        } catch (error) {
            console.error('Error confirming picture change:', error);
        }
    };

    return (
        <div className="profilepic-select">
            <h1 className="text-center">Select Profile Picture</h1>
            <div className="picture-options">
                {pictures.map((picture, index) => (
                    <ProfilePicCard key={index} url={picture.url} onClick={() => openModal(picture.url)} /> 
                ))}
            </div>
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Confirm Profile Picture Change">
                <h2>Confirm Profile Picture Change</h2>
                {selectedPicture && <img src={selectedPicture} alt="Selected Profile Pic" />}
                <div className="modal-buttons">
                    <button onClick={closeModal}>Cancel</button>
                    <button onClick={confirmChange}>Confirm</button>
                </div>
            </Modal>
        </div>
    );
};

export default ProfilePicSelect;
