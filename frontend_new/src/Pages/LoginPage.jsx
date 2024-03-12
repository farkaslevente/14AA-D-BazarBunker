import React from 'react'
import './CSS/LoginPage.css'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
    const navigate = useNavigate()
    return (
        <div className='loginpage'>
            <div className="login-container">
                <h1>Bejelentkezés</h1>
                <div className="login-fields">
                    <label for="email">Email</label>
                    <input type="email" placeholder='Az Ön email címe'/>

                    <label for="password">Jelszó</label>
                    <input type="password" placeholder='Jelszó'/>
                </div>
                <div>
                    <button onClick={() => navigate('/')}>Bejelentkezés</button>
                    <p className="login-signup">Még nincs fiókja? <a style={{ textDecoration: 'none'}} href='/regisztracio'>Hozzon létre egyet!</a></p>
                </div>
            </div>
        </div>
    )
}
