import React from 'react'
import './OwnCard.css'
import { useNavigate } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel';

export const OwnCard = () => {
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
                        <h3 className='card-title' id='added'>Hozzáadva:</h3>
                        <label htmlFor="added">"2024.10.21".</label>
                    </div>
                    <div className="card-description">
                        <p className=''>Itt fog megjelenni a hirdetés leírása, amit a hirdető beállított. Itt fog megjelenni a hirdetés leírása, amit a hirdető beállított.</p>
                    </div>
                    <div className="card-buttons">
                        <button onClick={() => navigate('/hirdetes')} className='addetailsbutton'>Részletek</button>
                    </div>
                </div>
            </div>
        </div>

        // <div className="cardpage">
        //     <section>
        //         <div className='card container'>
        //             <div className="cardcontent" style={{border: '1px solid black', padding: '10px'}}>
        //                 <div className="cardimage" style={{border: '1px solid black'}}>
        //                     <img src={bunker} alt="bunker" />
        //                 </div>
        //                 <div className="card-addetails" style={{border: '1px solid black', padding: '10px'}}>
        //                     <div className="card-data" style={{border: '1px solid black'}}>
        //                         <h2>"Cím - csakhogyhosszabblegyen"</h2>
        //                         <h2>Ár:</h2>
        //                         <label>"hirdetés ára"</label>
        //                         <h2>Létrehozva:</h2>
        //                         <label>"hirdetés dátuma"</label>
        //                     </div>
        //                     <div className="card-description" style={{border: '1px solid black'}}>
        //                         <p>Itt fog megjelenni a hirdetés leírása, amit a hirdető beállított.</p>
        //                     </div>
        //                     <div className="cardbutton">
        //                         <button></button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </section>
        // </div>
    )
}
