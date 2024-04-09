import React, { useState } from 'react'
import './CSS/ResetPasswordLogin.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


export const ResetPasswordLogin = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    const [backButton, setBackButton] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post(`${process.env.REACT_APP_LOCAL}/authorizereset`, { email: localStorage.getItem('tempEmail'), token: token });
            if (resp.status === 200) {
                localStorage.clear();

                const token = resp.data;
                const decoded = jwtDecode(token);
                const authEmail = decoded.payload.email;
                const userId = decoded.payload.id;
                const userName = decoded.payload.name;
                const userLocation = decoded.payload.location;
                const userPhone = decoded.payload.phone;
                const userPPic = decoded.payload.pPic;
                const userRole = decoded.payload.role;

                if (authEmail !== '') {
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('userName', userName);
                    localStorage.setItem('userLocation', userLocation);
                    localStorage.setItem('userPhone', userPhone);
                    localStorage.setItem('userPPic', userPPic);
                    localStorage.setItem('userRole', userRole);
                    localStorage.setItem('userEmail', authEmail);
                    localStorage.setItem('authUser', JSON.stringify(decoded.payload));
                }

                if (resp.data) {
                    navigate('/ujjelszo');
                    window.location.reload();
                }
            }
        } catch (error) {
            setError("Lejárt kód!")
            setBackButton(true);
            console.error(error);
        }
    };

    return (
        <div className='passwordresetloginpage'>
            <div className="passwordresetlogin-container">
                <h1>Jelszó Visszaállítás - 2.Lépés</h1>
                <form className='form' onSubmit={handleSubmit}>
                    <div className="passwordresetlogin-fields">
                        <label htmlFor="email">Email</label>
                        <input className='rounded' type="email" id='email' autoComplete='off' required placeholder='Az Ön email címe' value={localStorage.getItem('tempEmail')} onChange={(e) => setEmail(e.target.value)} disabled />
                        <label htmlFor="token">Kód:</label>
                        <input className='rounded' type="text" id='token' name='token' autoComplete='off' placeholder='8 karakteres kód' value={token} onChange={(e) => setToken(e.target.value)} />
                        {error && <p style={{ fontWeight: 'bold', color: 'red' }}>{error}</p>}
                        <p><strong>Az imént küldött kód 5 percig érvényes!</strong></p>
                        <ol start={4}>
                            <li>Írja be a kódot!</li>
                            <li>Bejelentkezés után változtassa meg a jelszavát!</li>
                        </ol>
                    </div>
                    <div>
                        {backButton && <button className='rounded' onClick={() => navigate('/elfelejtettjelszo')}>Vissza</button>}
                        <button className='rounded' type='submit'>Bejelentkezés</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
