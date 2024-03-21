import React, { useState } from 'react'
import './CSS/RegisterPage.css'
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const registerurl = 'http://localhost:9000/register'

export const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password);
        try {
            const resp = await axios.post(registerurl, { name: name, email: email, password: password });
            console.log(resp.data);
        } catch (error) {
            console.log(error.response);
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
                        <button type='submit' className='btn btn-block rounded'>Regisztráció</button>
                    </form>
                    <div>
                    </div>
                </div>
            </div>

            {/* <div className="registerpage">
                <h2 className='text-center'>Regisztráció</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <div className="form-fields">
                        <div className='form-row form-control form-floating'>
                            <label for='name' className='form-label'>Felhasználónév:</label>
                            <input type='text' className='form-input' id='name' placeholder='Felhasználónév'
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='form-row'>
                            <label for='email' className='form-label'>Email:</label>
                            <input type='email' className='form-input' id='email' placeholder='email@email.com'
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='form-row'>
                            <label for='password' className='form-label'>Jelszó:</label>
                            <input type='password' className='form-input' id='password' placeholder='Jelszó'
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <button type='submit' className='btn btn-block'>register</button>
                </form>
            </div> */}
        </div>
    );
}
