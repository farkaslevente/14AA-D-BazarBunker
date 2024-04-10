import React, { useState } from 'react'
import './CSS/PasswordResetPage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const PasswordResetPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [successStatus, setSuccessStatus] = useState(false);

    const [nexPage, setNextPage] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post(`${process.env.REACT_APP_LOCAL}/resetpassword`, { email: email });
            if (resp.status === 200) {
                setMessage("Email elküldve!");
                setNextPage(true);
                localStorage.setItem('tempEmail', email);
            }
        } catch (error) {
            console.error(error);
            setMessage("Email nem lett elküldve!")
        }
    };

    return (
        <div className='passwordresetpage'>
            <div className="passwordreset-container">
                <h1>Jelszó Visszaállítás - 1.Lépés</h1>
                <form className='form' onSubmit={handleSubmit}>
                    <div className="passwordreset-fields">
                        <label htmlFor="email">Email</label>
                        <input className='rounded' type="email" id='email' autoComplete='off' required placeholder='Az Ön email címe' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <p><strong>Fontos, hogy az Ön által regisztrált email címet írja be!</strong></p>
                        <ol>
                            <li>Írja be email címét.</li>
                            <li>Küldünk önnek egy <strong>8 karakteres kódot</strong> a megadott email címre.</li>
                            <li>Nyomjon a "Tovább gombra!"</li>
                        </ol>
                    </div>
                    {message && <div style={{ textAlign: 'center' }}>
                        <p style={{ color: 'green' }}>{message}</p>
                    </div>}
                    <div style={{textAlign: 'center'}}>
                        {!nexPage && <button className='rounded' type='submit'>Jelszó visszaállítása</button>}
                        {nexPage && <button onClick={() => navigate('/elfelejtettjelszobejelentkezes')}>Tovább</button>}
                    </div>
                </form>
            </div>
        </div>
    )
}
