import React, { useState } from 'react'
import './CSS/RegisterPage.css'
import userservice from '../Services/userservice';
// import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await userservice.registerUser({ name: name, email: email, password: password });
            console.log(resp.data);
        } catch (error) {
            if (error.resp) {
                console.log('Error response:', error.resp);
            } else if (error.request) {
                console.log('No response received:', error.request);
            } else {
                console.log('Error:', error.message);
            }
        }
    };

    return (
        <div className="">
            <div className='registerpage'>
                <div className="register-container">
                    <h1>Regisztráció</h1>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className="register-fields">
                            <label htmlFor='name' className='form-label'>Felhasználónév:</label>
                            <input type='text' required className='form-input' id='name' placeholder='Felhasználónév'
                                value={name} onChange={(e) => setName(e.target.value)} />

                            <label htmlFor='email' className='form-label'>Email:</label>
                            <input type='email' required className='form-input' id='email' placeholder='email@email.com'
                                value={email} onChange={(e) => setEmail(e.target.value)} />

                            <label htmlFor='password' className='form-label'>Jelszó:</label>
                            <input type='password' required className='form-input' id='password' placeholder='Jelszó'
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="">
                            <button type='submit' className='btn rounded'>Regisztráció</button>
                        </div>
                        <div className="">
                            <p className="register-signup">Már van fiókja? <a style={{ textDecoration: 'none' }} href='/bejelentkezes'>Jelentkezzen be!</a></p>
                        </div>
                    </form>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    );
}
