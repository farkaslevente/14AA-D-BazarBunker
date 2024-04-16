import React from 'react';
import './ProfilePicCard.css';

const ProfilePicCard = ({ url, onClick }) => {
  return (
    <div className="profile-pic-card" onClick={onClick}> 
      <img src={url} alt="Profile Pic" />
    </div>
  );
};

export default ProfilePicCard;
