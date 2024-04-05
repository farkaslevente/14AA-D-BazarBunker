import React, { useEffect, useState } from 'react';
import { Card } from '../Components/Card/Card';
import './CSS/AllAdsPage.css';
import adservice from '../Services/adservice';
import axios from 'axios';

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

        // Fetch images and set thumbnail images using Axios
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST103}/pictures/upload`);
                const imageFileNames = response.data;

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
            <div className="alladspage-content">
                <div className="cards">
                    {ads.map(ad => (
                        <Card key={ad.id} ad={ad} thumbnail={thumbnailImages[ad.id]} />
                    ))}
                </div>
            </div>
        </div>
    );
};
