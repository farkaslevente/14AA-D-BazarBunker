import React from 'react'
import MyCarousel from '../Components/AdDetailsCarousel/AdDetailsCarousel'
import './CSS/AdDetailsPage.css'

export const AdDetailsPage = () => {
    return (
        <div className='addetailspage'>
            <h1>Hirdetés részletek</h1>
            <div className="addetails">
                <div className="carousel">
                    <MyCarousel />
                </div>
                <div className="addetails-data">
                    <label htmlFor="">Title</label><br />
                    <label htmlFor="">Price</label><br />
                    <label htmlFor="">Location</label><br />
                    <label htmlFor="">Advertiser</label><br />
                    <label htmlFor="">Phone Number</label><br />
                    <label htmlFor="">Date added</label><br />
                    <label htmlFor="">Description</label><br />
                </div>
            </div>
        </div>
    )
}
