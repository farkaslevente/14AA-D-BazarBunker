import React from 'react'
import './CSS/NewAdPage.css'

export const NewAdPage = () => {
    return (
        <div className='newadpage'>
            <div className="newadpage-title">
                <h1>Új hirdetés</h1>
            </div>
            <div className="newadpage-content">
                <div className="data1">
                    <label htmlFor="title">Hirdetés megnevezése:</label>
                    <input type="text" name='title' placeholder='pl: Asztal'/>

                    <label htmlFor="county">Hirdetés megye:</label>
                    <input type="text" name='county' placeholder='pl: Győr-moson-Sopron'/>

                    <label htmlFor="settlement">Hirdetés pontos helye:</label>
                    <input type="text" name='settlement' placeholder='pl: Győr'/>

                    <label htmlFor="price">Ár:</label>
                    <input type="text" name='price' placeholder='pl: Asztal'/>
                </div>
                <div className="data2">

                </div>
            </div>
        </div>
    )
}
