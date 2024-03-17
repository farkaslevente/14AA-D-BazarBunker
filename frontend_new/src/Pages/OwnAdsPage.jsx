import React from 'react'
import { OwnCard } from '../Components/OwnCard/OwnCard'
import './CSS/OwnAdPage.css'

export const OwnAdsPage = () => {
    return (
        <div className='ownadspage'>
            <div className="ownadspage-title">
                <h1>Saját hirdetések</h1>
            </div>
            <div className="ownadspage-content">
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
