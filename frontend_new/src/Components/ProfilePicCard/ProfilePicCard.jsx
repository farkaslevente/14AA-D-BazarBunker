import React from 'react';
import './ProfilePicCard.css';

const ProfilePicCard = ({ url }) => {
  return (
    <div className="profile-pic-card">
      <img src={url} alt="Profile Pic" />
    </div>
  );
};

export default ProfilePicCard;
