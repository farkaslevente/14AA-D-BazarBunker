import React, { useState } from 'react'
import './Card.css'

export const Card = () => {
    
    return (
        <div className='card-container'>
            <img src='https://picsum.photos/300/200' alt='Card Image'/>
            <h3 className='card-title'>Card title</h3>
            <p className='card-description'>Itt fog megjelenni a hirdetés leírása, amit a hirdető beállított. Itt fog megjelenni a hirdetés leírása, amit a hirdető beállított.</p>
            <a href="">llooooll</a>
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
