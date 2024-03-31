import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MyCarousel from '../Components/AdDetailsCarousel/AdDetailsCarousel';
import './CSS/AdDetailsPage.css';
import adservice from '../Services/adservice'; // Import your ad service

export const AdDetailsPage = () => {
    const { id } = useParams(); // Retrieve ad ID from URL parameters
    const [ad, setAd] = useState(null); // State to hold ad details

    useEffect(() => {
        // Fetch ad details when the component mounts
        const fetchAdDetails = async () => {
            try {
                const adDetails = await adservice.getAdById(id); // Replace with your ad service function
                setAd(adDetails);
            } catch (error) {
                console.error('Error fetching ad details:', error);
            }
        };

        fetchAdDetails();

        // Cleanup function to clear ad details when component unmounts
        return () => setAd(null);
    }, [id]);

    if (!ad) {
        return <div>Loading...</div>; // Render loading indicator while fetching ad details
    }

    return (
        <div className='addetailspage'>
            <h1>Hirdetés részletek</h1>
            <div className="addetails">
                <div className="carousel">
                    <MyCarousel />
                </div>
                <div className="addetails-data">
                    <label htmlFor="">{ad.nev}</label><br />
                    <label htmlFor="">{ad.ar}</label><br />
                    <label htmlFor="">Location</label><br />
                    <label htmlFor="">Advertiser</label><br />
                    <label htmlFor="">Phone Number</label><br />
                    <label htmlFor="">Date added</label><br />
                    <label htmlFor="">Description</label><br />
                    <label htmlFor="favourite" style={{ marginRight: '10px'}}>Kedvenc</label>
                    <input type="checkbox" name="favourite" id="favourote" />
                </div>
            </div>
        </div>
    );
};
