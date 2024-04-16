import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';

export const Card = ({ ad, thumbnail }) => {
    const navigate = useNavigate();

    return (
        <div className='card-container'>
            <div className="card-content">
                <div className="card-thumbnail">
                    <img className='cardImg' src={thumbnail ? `${process.env.REACT_APP_HOST202}/uploads/${thumbnail}` : 'https://picsum.photos/300/200'} alt='Card Image' />
                </div>
                <div className="card-details">
                    <div className="card-data">
                        <h5 style={{marginBottom: '10px', textDecoration: 'underline'}} className='card-title'><i>{ad.nev}</i></h5>
                        <h5 style={{marginBottom: '10px'}} className='card-title' id='category'><i>Kategória: {ad.kategoria}</i></h5>
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
