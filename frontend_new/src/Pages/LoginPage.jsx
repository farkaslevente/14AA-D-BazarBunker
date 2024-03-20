import React, { useState } from 'react'
import './CSS/LoginPage.css'
//import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const loginurl = 'http://127.0.0.1:9000/login'

export const LoginPage = () => {
    //const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post(loginurl, {email: email, password: password})
            const token = resp.data;
            localStorage.setItem('token', token);
            console.log(resp.data);
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <div className='loginpage'>
            <div className="login-container">
                <h1>Bejelentkezés</h1>
                <form className='form' onSubmit={handleSubmit}>
                    <div className="login-fields">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' autoComplete='off' required placeholder='Az Ön email címe' value={email} onChange={(e) => setEmail(e.target.value)}/>

                        <label htmlFor="password">Jelszó</label>
                        <input type="password" id='password' autoComplete='off' required placeholder='Jelszó' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <button type='submit'>Bejelentkezés</button>
                        <p className="login-signup">Még nincs fiókja? <a style={{ textDecoration: 'none'}} href='/regisztracio'>Hozzon létre egyet!</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
