import React from 'react'
import './CSS/ProfilePage.css'

export const ProfilePage = () => {
    return (
        <div className='profilepage'>
            <div className="profile">
                <div className="profile-header">
                    <h1>Profil</h1>
                </div>
                <div className="profile-content">
                    <img alt="Profile Image" className="profile-image" />
                    <button>lol</button>
                    <div className="profile-details">
                        <ul>
                            <li><strong>Felhasználónév:</strong></li>
                            <li><strong>Hely:</strong></li>
                            <li><strong>Csatlakozott:</strong></li>
                            <label for="description">Leírás</label>
                            <textarea name='description'></textarea>
                        </ul>
                        <button></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
