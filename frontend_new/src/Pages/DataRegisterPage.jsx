import React from 'react'
import './CSS/DataRegisterPage.css'
import { useNavigate } from 'react-router-dom'

export const DataRegisterPage = () => {
    const navigate = useNavigate()
    return (
        <div className='dataregisterpage'>
            <div className="dataregister-container">
                <h1>Adat rögzítés</h1>
                <div className="dataregister-fields">
                    <input type="tel" placeholder='Telefonszám - (pl: 06309876543)'/>
                    <input type="text" placeholder='Tartózkodási hely'/>
                    <input type="text" placeholder='Vármegye'/>
                </div>
                <div className="">
                    <button onClick={() => navigate('/bejelentkezes')}>Regisztráció</button>
                </div>
            </div>
        </div>
    )
}
