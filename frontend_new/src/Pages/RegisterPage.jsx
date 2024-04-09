import React, { useState } from 'react'
import './CSS/RegisterPage.css'
import userservice from '../Services/userservice';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await userservice.registerUser({ name: name, email: email, password: password, location: location, phone: phone });
            if (resp.message = 'Successful registration') {
                navigate('/bejelentkezes');
            }
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
                            <input type='text' required className='form-input' id='name' placeholder='Felhasználónév (5-25 karakter)'
                                value={name} onChange={(e) => setName(e.target.value)} autoComplete='off' minLength={5} maxLength={25}/>

                            <label htmlFor='email' className='form-label'>Email:</label>
                            <input type='email' required className='form-input' id='email' placeholder='email@email.com'
                                value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off' />

                            <label htmlFor='password' className='form-label'>Jelszó:</label>
                            <input type='password' required className='form-input' id='password' placeholder='Jelszó (8-25 karakter)'
                                value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off' minLength={8} maxLength={25}/>

                            <label htmlFor='location' className='form-label'>Település:</label>
                            <input type='location' required className='form-input' id='location' placeholder='Visegrád'
                                value={location} onChange={(e) => setLocation(e.target.value)} autoComplete='off' />

                            <label htmlFor='phone' className='form-label'>Telefonszám:</label>
                            <input type='tel' required className='form-input' id='phone' placeholder='06309418328'
                                value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete='off' minLength={11} maxLength={11}/>

                            {/* <label htmlFor='email' className='form-label'>Vármegye:</label>
                                <input type='email' required className='form-input' id='email' placeholder='email@email.com'
                                    value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off'/> */}
                        </div>
                        <div className="">
                            <button type='submit' className='btn rounded' style={{border: '1px solid black'}}>Regisztráció</button>
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
