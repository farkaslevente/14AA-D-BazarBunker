import React from 'react';
import './ProfilePicCard.css';

const ProfilePicCard = ({ picture }) => {
    return (
        <div className="profile-pic-card">
            <img src={picture.url} alt="Profile Picture" />
        </div>
    );
};

export default ProfilePicCard;
