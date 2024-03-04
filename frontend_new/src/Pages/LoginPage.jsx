import React from 'react'
import './CSS/LoginPage.css'

export const LoginPage = () => {
  return (
    <div className='loginpage'>
        <div className="login-container">
            <h1>Bejelentkezés</h1>
            <div className="login-fields">
                <input type="email" placeholder='Az Ön email címe'/>
                <input type="password" placeholder='Jelszó'/>
            </div>
            <div>
                <button>Bejelentkezés</button>
                <p className="login-signup">Még nincs fiókja? <a style={{ textDecoration: 'none'}} href='/regisztracio'>Hozzon létre egyet!</a></p>
            </div>
        </div>
    </div>
  )
}
