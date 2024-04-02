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
    const [settlement, setSettlement] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await userservice.registerUser({ name: name, email: email, password: password, telefonszam: phone, location: settlement, role: 0 });
            console.log(resp.data);
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
                            <input type='text' required className='form-input' id='name' placeholder='Felhasználónév'
                                value={name} onChange={(e) => setName(e.target.value)} autoComplete='off'/>
                            <label htmlFor='email' className='form-label'>Email:</label>
                            <input type='email' required className='form-input' id='email' placeholder='email@email.com'
                                value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off'/>
                            <label htmlFor='password' className='form-label'>Jelszó:</label>
                            <input type='password' required className='form-input' id='password' placeholder='Jelszó'
                                value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off' />
                            <label htmlFor='phone' className='form-label'>Telefonszám:</label>
                            <input type='tel' required className='form-input' id='phone' placeholder='06309418328'
                                value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete='off'/>
                            {/* <label htmlFor='email' className='form-label'>Vármegye:</label>
                                <input type='email' required className='form-input' id='email' placeholder='email@email.com'
                                    value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off'/> */}
                            <label htmlFor='settlement' className='form-label'>Település:</label>
                            <input type='settlement' required className='form-input' id='settlement' placeholder='Visegrád'
                                value={settlement} onChange={(e) => setSettlement(e.target.value)} autoComplete='off'/>
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
