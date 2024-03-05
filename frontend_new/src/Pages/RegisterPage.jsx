import React from 'react'
import './CSS/RegisterPage.css'
import { useNavigate } from 'react-router-dom'

export const RegisterPage = () => {
  const navigate = useNavigate()
  return (
    <div className='registerpage'>
      <div className="register-container">
        <h1>Regisztráció</h1>
        <div className="register-fields">
          <input type="text" placeholder='Felhasználónév' />
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Jelszó' />
          <input type="password" placeholder='Jelszó újra' />
        </div>
        <div className="">
          <button onClick={() => navigate('/adatregisztracio')}>Tovább</button>
        </div>
      </div>
    </div>
  )
}
