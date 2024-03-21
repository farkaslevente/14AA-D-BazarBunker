import React, { useState } from 'react'
import './CSS/PasswordResetPage.css'

export const PasswordResetPage = () => {
    const [email, setEmail] = useState('');

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    // }

    return (
        <div className='passwordresetpage'>
            <div className="passwordreset-container">
                <h1>Jelszó Visszaállítás</h1>
                <form className='form'>
                    <div className="passwordreset-fields">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' autoComplete='off' required placeholder='Az Ön email címe' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <p><i>Az ide beírt email címre egy jelszóvissaállító link-et küldünk, mely segítségével lecserélheti jelszavát.</i></p>
                        <p><strong>Fontos, hogy az Ön által regisztrált email címet írja be!</strong></p>
                    </div>
                    <div>
                        <button className='rounded' type='submit'>Jelszó visszaállítása</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
