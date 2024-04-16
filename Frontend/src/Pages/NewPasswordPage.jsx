import React, { useState } from 'react'
import './CSS/NewPasswordPage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const NewPasswordPage = () => {
    const [password, setPassword] = useState('');

    const [nextPage, setNextPage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');
        const headers = {
            'Authorization': `Bearer ${authToken}`
        };
        try {
            await axios.post(`${process.env.REACT_APP_HOST202}/users/newpassword`, { password: password }, { headers });
            setSuccessMessage("Jelszó megváltoztatva!");
            setNextPage(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='newpasswordpage'>
            <div className="newpassword-container">
                <h1>Új jelszó megadása</h1>
                <form className='form' onSubmit={handleSubmit}>
                    <div className="newpassword-fields">
                        <label htmlFor="newpassword" style={{marginBottom: '10px'}}>Új jelszó</label>
                        <input className='rounded' type="password" id='newpassword' autoComplete='off' required placeholder='Új jelszó (8-25 karakter)' minLength={8} maxLength={25} value={password} onChange={(e) => setPassword(e.target.value)} />
                        {successMessage && <div style={{textAlign: 'center'}}>
                            <p style={{color: 'green'}}>{successMessage}</p>
                        </div>}
                    </div>
                    <div style={{textAlign: 'center'}}>
                        {!nextPage && <button className='rounded' type='submit' style={{background: '#B27AFA', border: '1px solid black', color: 'black'}}>Új jelszó mentése</button>}
                        {nextPage && <button onClick={() => navigate('/profil')} style={{background: '#B27AFA', border: '1px solid black', color: 'black'}}>Tovább a profilra</button>}
                    </div>
                </form>
            </div>
        </div>
    )
}
