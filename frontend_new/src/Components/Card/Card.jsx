import React, { useState } from 'react'
import './Card.css'

export const Card = () => {
    const [cards] = useState([
        {
            title: 'Card-1',
            text: 'Itt fog megjelenni a hirdetés leírása, amit a hirdető beállított.'
        },
        {
            title: 'Card-2',
            text: 'Itt fog megjelenni a hirdetés leírása, amit a hirdető beállított.'
        },
        {
            title: 'Card-3',
            text: 'Itt fog megjelenni a hirdetés leírása, amit a hirdető beállított.'
        },
        {
            title: 'Card-4',
            text: 'Itt fog megjelenni a hirdetés leírása, amit a hirdető beállított.'
        },
        {
            title: 'Card-5',
            text: 'Itt fog megjelenni a hirdetés leírása, amit a hirdető beállított.'
        },
        {
            title: 'Card-6',
            text: 'Itt fog megjelenni a hirdetés leírása, amit a hirdető beállított.'
        },

    ])
    return (
        <div>
            <section>
                <div className="container">
                    <div className="cards">
                        {
                            cards.map((card, i) => {
                                <div key={i} className="card">
                                    <h3>{card.title}</h3>
                                    <p>{card.text}</p>
                                </div>
                            })
                        }
                    </div>
                </div>
            </section>
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
