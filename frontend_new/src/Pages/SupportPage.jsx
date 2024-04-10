import React, { useState } from 'react';
import './CSS/SupportPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const SupportPage = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [successStatus, setSuccessStatus] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');
        const headers = {
            'Authorization': `Bearer ${authToken}`
        };
        try {
            await axios.post(`${process.env.REACT_APP_LOCAL}/support`, { title: title, message: message }, { headers });
            setSuccessMessage("Kérdését megkaptuk, nemsokára felkeressük Önt!");
            setErrorMessage("");
            setSuccessStatus(true);
        } catch (error) {
            console.error(error);
            setSuccessMessage("");
            setErrorMessage("Kérdés nem lett elküldve!")
        }
    };

    return (
        <div className='supportpage'>
            <div className="support-container">
                <h1>Support</h1>
                <h5>Tegye fel kérdését, és munkatársunk felveszi Önnel a kapcsolatot!</h5>
                <form className='form' onSubmit={handleSubmit}>
                    <div className="support-fields">
                        <label htmlFor="title">Tárgy:</label>
                        <input className='rounded' type="text" id='title' autoComplete='off' required placeholder='Mivel kapcsolatban van kérdése?' value={title} onChange={(e) => setTitle(e.target.value)} />

                        <label htmlFor="question">Kifejtés:</label>
                        <textarea rows={6} cols={10} maxLength={200} className='rounded' type="text" id='question' autoComplete='off' required placeholder='Kérjük fejtse ki problémáját!' value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>
                    <div className="messages" style={{marginTop: '10px', textAlign: 'center'}}>
                        {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
                        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                    </div>
                    <div>
                        {!successStatus && <button className='rounded' type='submit'>Küldés</button>}
                        {successStatus && <button className='rounded' onClick={() => navigate('/')}>Tovább a főoldalra</button>}
                    </div>
                </form>
            </div>
        </div>
    );
}
