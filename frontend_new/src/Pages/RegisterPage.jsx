import React, { useState } from 'react'
import './CSS/RegisterPage.css'
import axios from 'axios';

const registerurl = 'http://10.0.22.14:9000/register'

export const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password);
        try {
            const resp = await axios.post(registerurl, {name:name, email:email, password:password});
            console.log(resp.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <div className="registerpage">
            <section>
                <h2 className='text-center'>Regisztráció</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <div className='form-row form-control form-floating'>
                        <label htmlFor='name' className='form-label'>Felhasználónév</label>
                        <input type='text' className='form-input' id='name' placeholder='Felhasználónév'
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='form-row'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input type='email' className='form-input' id='email' placeholder='email@email.com' 
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='form-row'>
                        <label htmlFor='password' className='form-label'>Jelszó</label>
                        <input type='password' className='form-input' id='password' placeholder='Jelszó'
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type='submit' className='btn btn-block'>register</button>
                </form>
            </section>
        </div>
    );
}
