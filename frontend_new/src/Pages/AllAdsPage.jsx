import React, { useEffect, useState } from 'react'
import { Card } from '../Components/Card/Card'
import './CSS/AllAdsPage.css'
import adservice from '../Services/adservice'

export const AllAdsPage = () => {
    const [ads, setAds] = useState([]);
    const [thumbnailImages, setThumbnailImages] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adsData = await adservice.getAllAds();
                setAds(adsData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

        // Fetch images and set thumbnail images
        const fetchImages = async () => {
            try {
                const imageFiles = await fetch(`${process.env.REACT_APP_LOCAL}/pictures/upload`);
                const imageFileNames = await imageFiles.json();

                // Filter image files and set thumbnail images
                const thumbnails = {};
                imageFileNames.forEach(fileName => {
                    const [userId, adId, index] = fileName.split('_');
                    if (thumbnails[adId] === undefined || parseInt(index) === 0) {
                        thumbnails[adId] = fileName;
                    }
                });
                setThumbnailImages(thumbnails);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);


    return (
        <div className='alladspage'>
            <div className="alladspage-title">
                <h1>Hirdetések</h1>
            </div>
            {/* <div className="alladspage-filterbar">
                <div className="filtercounty">
                    <label htmlFor="county">Vármegye:</label>
                    <select name="county" id="county">
                        <option value="">No filter</option>
                        <option value="">Pest</option>
                        <option value="">Nógrád</option>
                        <option value="">Nigatown</option>
                        <option value="">Anyád</option>
                    </select>
                </div>
                <div className="filtercategory">
                    <label htmlFor="category">Kategória:</label>
                    <select name="category" id="category">
                        <option value="">No filter</option>
                        <option value="">minden</option>
                        <option value="">egyetem</option>
                        <option value="">kozepsuli</option>
                        <option value="">altalanos</option>
                    </select>
                </div>
                <div className="filterprice">
                    <label htmlFor="price">Ár:</label>
                    <select name="price" id="price">
                        <option value="">No filter</option>
                        <option value="">ascending</option>
                        <option value="">decending</option>
                    </select>
                </div>
                <div className="apply">
                    <button>Apply filters</button>
                </div>
            </div> */}
            <div className="alladspage-content">
                <div className="cards">
                    {ads.map(ad => (
                        <Card key={ad.id} ad={ad} thumbnail={thumbnailImages[ad.id]} />
                    ))}
                </div>
            </div>
        </div>
    )
}
