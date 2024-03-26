import React, { useState } from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'

export const Card = () => {
    const navigate = useNavigate()
    return (
        <div className='card-container'>
            <div className="card-content">
                <img src='https://picsum.photos/300/200' alt='Card Image' />
                <div className="card-data">
                    <div className="card-info">
                        <h3 className='card-title'>"Card title"</h3>
                        <h3 className='card-title' id='category'>Kategória:</h3>
                        <label htmlFor="category">"Egyetem"</label>
                        <h3 className='card-title' id='added'>Ár:</h3>
                        <label htmlFor="added">"3000 Ft".</label>
                    </div>
                    <div className="card-description">
                        <p className=''>Itt fog megjelenni a hirdetés leírása, amit a hirdető beállított. Itt fog megjelenni a hirdetés leírása, amit a hirdető beállított. </p>
                    </div>
                    <div className="card-buttons">
                        <button onClick={() => navigate('/hirdetes')} className='addetailsbutton'>Részletek</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
