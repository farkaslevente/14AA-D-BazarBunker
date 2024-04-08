import React, { useState, useEffect } from 'react';
import axios from 'axios';
import adservice from './../Services/adservice';
import Modal from 'react-modal';
import './CSS/OwnAdsPage.css';

export const OwnAdsPage = () => {
    const userId = localStorage.getItem('userId');
    const [userAds, setUserAds] = useState([]);
    const [error, setError] = useState(null);
    const [selectedAdId, setSelectedAdId] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await adservice.getAllAds();
                const filteredAds = data.filter(ad => ad.tulajId === parseInt(userId));
                setUserAds(filteredAds);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [userId]);

    const handleDeleteConfirmation = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_LOCAL}/ads/${selectedAdId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            setUserAds(prevAds => prevAds.filter(ad => ad.id !== selectedAdId));
            setShowDeleteConfirmation(false);
        } catch (error) {
            console.error('Error deleting ad:', error.message);
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="ownadspage">
            <h1 className="ownadspage-title">Saját Hirdetések</h1>
            <div className="ownadspage-content">
                <table>
                    <thead>
                        <tr>
                            <th>Megnevezés</th>
                            <th>Hozzáadva</th>
                            <th>Lehetőségek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userAds.map(ad => (
                            <tr key={ad.id}>
                                <td>{ad.nev}</td>
                                <td>{new Date(ad.datum).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => setSelectedAdId(ad.id)}>Szerkesztés</button>
                                    <button
                                        onClick={() => {
                                            setSelectedAdId(ad.id);
                                            setShowDeleteConfirmation(true);
                                        }}
                                        style={{ background: 'red', border: '1px solid black', color: 'black' }}
                                    >
                                        Törlés
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={showDeleteConfirmation}
                onRequestClose={() => setShowDeleteConfirmation(false)}
                contentLabel="Delete Confirmation"
                ariaHideApp={false}
                style={{

                    overlay: {
                        zIndex: 1000,
                    },
                    content: {
                        width: 'fit-content',
                        height: 'fit-content',
                        textAlign: 'center',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: '2px solid red',
                        borderRadius: '20px',
                    },

                }}
            >
                <h2>Biztosan szeretné törölni ezt a hirdetést?</h2>
                <div>
                    <button onClick={handleDeleteConfirmation} style={{ background: 'red', border: '1px solid black', color: 'black' }}>Igen</button>
                    <button onClick={() => setShowDeleteConfirmation(false)}>Nem</button>
                </div>
            </Modal>
        </div>
    );
};

export default OwnAdsPage;
