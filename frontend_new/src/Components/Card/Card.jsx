import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';

export const Card = ({ ad, thumbnail }) => {
    const navigate = useNavigate();

    return (
        <div className='card-container'>
            <div className="card-content">
                <img className='cardImg' src={thumbnail ? `http://10.0.22.22:9000/uploads/${thumbnail}` : 'https://picsum.photos/300/200'} alt='Card Image' />
                <div className="card-data">
                    <div className="card-info">
                        <h3 className='card-title'><i>{ad.nev}</i></h3>
                        <h3 className='card-title' id='category'><i>Kategória:</i></h3>
                        <label htmlFor="category">{ad.kategoria}</label>
                        <label htmlFor="added"><b>{ad.ar}</b> -Ft</label>
                    </div>
                    <div className="card-description">
                        <p className=''>{ad.leiras}</p>
                    </div>
                    <div className="card-buttons">
                        <button onClick={() => navigate(`/hirdetes/${ad.id}`)} className='addetailsbutton'>Részletek</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
