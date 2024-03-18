import React from 'react'
import MyCarousel from '../Components/AdDetailsCarousel/AdDetailsCarousel'
import './CSS/AdDetailsPage.css'

export const AdDetailsPage = () => {
    return (
        <div className='addetailspage'>
            <h1>Hirdetés részletek</h1>
            <div className="carousel">
                <MyCarousel />
            </div>
        </div>
    )
}
