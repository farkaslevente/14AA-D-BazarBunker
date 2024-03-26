import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'

export const Card = ({ ad }) => {
    const navigate = useNavigate()
    return (
        <div className='card-container'>
            <div className="card-content">
                <img src='https://picsum.photos/300/200' alt='Card Image' />
                <div className="card-data">
                    <div className="card-info">
                        <h3 className='card-title'>{ad.nev}</h3>
                        <h3 className='card-title' id='category'>Kategória:</h3>
                        <label htmlFor="category">{ad.kategoria}</label>
                        <h3 className='card-title' id='added'>Ár:</h3>
                        <label htmlFor="added">{ad.ar} -Ft</label>
                    </div>
                    <div className="card-description">
                        <p className=''>{ad.leiras}</p>
                    </div>
                    <div className="card-buttons">
                        <button onClick={() => navigate('/hirdetes')} className='addetailsbutton'>Részletek</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
