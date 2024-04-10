import React, { useState } from 'react'
import './CSS/NewPasswordPage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const NewPasswordPage = () => {
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');
        const headers = {
            'Authorization': `Bearer ${authToken}`
        };
        try {
            const resp = await axios.post(`${process.env.REACT_APP_LOCAL}/newpassword`, { password: password }, { headers });
                alert("Jelszó megváltoztatva!");
                navigate("/profil");
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
                        <label htmlFor="newpassword">Új jelszó</label>
                        <input className='rounded' type="password" id='newpassword' autoComplete='off' required placeholder='Új jelszó' minLength={8} maxLength={25} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button className='rounded' type='submit'>Új jelszó mentése</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
