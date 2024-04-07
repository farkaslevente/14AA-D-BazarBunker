import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfilePicCard from '../Components/ProfilePicCard/ProfilePicCard';
import './CSS/ProfilePicSelect.css';

export const ProfilePicSelect = () => {
    const [pictures, setPictures] = useState([]);

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

    return (
        <div className="profile-pic-select">
            <h1 className="text-center">Select Profile Picture</h1>
            <div className="picture-options">
                {pictures.map((picture, index) => (
                    <ProfilePicCard key={index} picture={picture} />
                ))}
            </div>
        </div>
    );
};

export default ProfilePicSelect;