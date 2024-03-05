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
                    <div className="profile-details">
                        <ul>
                            <li><strong>Felhasználónév:</strong></li>
                            <li><strong>Hely:</strong></li>
                            <li><strong>Csatlakozott:</strong></li>
                            <li><strong>Összes hirdetés száma:</strong> "" hirdetés</li>
                        </ul>
                        <div className="description">
                            <label for="description"><strong>Leírás:</strong></label>
                            <textarea name='description'></textarea>
                        </div>
                    </div>
                </div>
                <div className="editbutton row">
                    <button style={{marginRight: '100px'}}>Szerkesztés</button>
                    <button style={{background: 'lightgreen'}}>Saját hirdetések</button>
                </div>
            </div>
        </div>
    )
}
