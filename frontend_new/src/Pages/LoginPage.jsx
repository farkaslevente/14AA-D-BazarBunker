import React, { useState } from 'react'
import './CSS/LoginPage.css'
import { useNavigate } from 'react-router-dom'
import userservice from '../Services/userservice'
import { jwtDecode } from "jwt-decode";

export const LoginPage = () => {
    const navigate = useNavigate()

    const [error, setError] = useState(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await userservice.login({ email: email, password: password })
            const token = resp.data.token;
            const decoded = jwtDecode(token);
            const authEmail = decoded.payload.email;
            const userId = decoded.payload.id;
            const userName = decoded.payload.name;
            const userLocation = decoded.payload.location
            const userPhone = decoded.payload.phone;
            const userPPic = decoded.payload.pPic;
            const userFavourites = decoded.payload.favourites;
            if (authEmail !== '') {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('authToken', token);
                localStorage.setItem('userId', userId)
                localStorage.setItem('userName', userName)
                localStorage.setItem('userLocation', userLocation)
                localStorage.setItem('userPhone', userPhone)
                localStorage.setItem('userPPic', userPPic)
                localStorage.setItem('userFavourites', userFavourites)
                localStorage.setItem('authUser', JSON.stringify(decoded.payload));
            }
            if (resp.data) {
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            setError("Hibás email cím vagy jelszó!");
        }
    }

    return (
        <div className='loginpage'>
            <div className="login-container">
                <h1>Bejelentkezés</h1>
                <form className='form' onSubmit={handleSubmit}>
                    <div className="login-fields">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' autoComplete='off' required placeholder='Az Ön email címe' value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label htmlFor="password">Jelszó</label>
                        <input type="password" id='password' autoComplete='off' required placeholder='Jelszó' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <div className="errors">{error}</div>}
                    <div>
                        <button className='rounded' type='submit'>Bejelentkezés</button>
                        <p className="login-signup">Még nincs fiókja? <a style={{ textDecoration: 'none' }} href='/regisztracio'>Hozzon létre egyet!</a></p>
                        <p className="login-signup"><a style={{ textDecoration: 'none' }} href='/elfelejtettjelszo'>Elfelejtett jelszó?</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
