import React from 'react'
import { OwnCard } from '../Components/OwnCard/OwnCard'

export const OwnAdsPage = () => {
    return (
        <div className='alladspage'>
            <div className="alladspage-title">
                <h1>Saját hirdetések</h1>
            </div>
            <div className="alladspage-content">
                <div className="cards">
                    <OwnCard/>
                    <OwnCard/>
                    <OwnCard/>
                    <OwnCard/>
                    <OwnCard/>
                </div>
            </div>
        </div>
    )
}
