import React from 'react'
import './CSS/ProfilePage.css'
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
    const navigate = useNavigate()

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
                            <li>
                                <label htmlFor="location">Hely:</label>
                                <span id="location"></span>
                            </li>
                            <li>
                                <label htmlFor="joined">Csatlakozott:</label>
                                <span id="joined"></span>
                            </li>
                            <li>
                                <label htmlFor="adsCount">Összes hirdetés száma:</label>
                                <span id="adsCount">"" hirdetés</span>
                            </li>
                        </ul>
                        <div className="editbutton">
                            <button>Szerkesztés</button>
                            <button onClick={() => navigate('/sajathirdetesek')}>Saját hirdetések</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
