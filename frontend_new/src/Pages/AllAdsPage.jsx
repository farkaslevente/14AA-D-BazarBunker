import React, { useEffect, useState } from 'react';
import { Card } from '../Components/Card/Card';
import './CSS/AllAdsPage.css';
import adservice from '../Services/adservice';
import axios from 'axios';

export const AllAdsPage = () => {
    const [ads, setAds] = useState([]);
    const [filteredAds, setFilteredAds] = useState([]);
    const [thumbnailImages, setThumbnailImages] = useState({});
    const [filters, setFilters] = useState({
        name: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        countyId: '',
    });
    const [counties, setCounties] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adsData = await adservice.getAllAds();
                setAds(adsData);
                setFilteredAds(adsData); // Set default filtered ads to all ads
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

        const fetchCounties = async () => {
            try {
                const countiesData = await adservice.getCounties();
                setCounties(countiesData);
            } catch (error) {
                console.error('Error fetching counties:', error);
            }
        };

        fetchCounties();

        const fetchImages = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_LOCAL}/pictures/upload`);
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

    const applyFilters = () => {
        let filtered = [...ads];

        // Filter by name
        if (filters.name) {
            filtered = filtered.filter(ad => ad.nev.toLowerCase().includes(filters.name.toLowerCase()));
        }

        // Filter by category
        if (filters.category) {
            filtered = filtered.filter(ad => ad.kategoria === filters.category);
        }

        // Filter by price range
        if (filters.minPrice && filters.maxPrice) {
            filtered = filtered.filter(ad => ad.ar >= parseFloat(filters.minPrice) && ad.ar <= parseFloat(filters.maxPrice));
        }

        // Filter by county
        if (filters.countyId) {
            filtered = filtered.filter(ad => ad.varmegyeId === parseInt(filters.countyId));
        }

        setFilteredAds(filtered);
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    return (
        <div className='alladspage'>
            <div className="alladspage-title">
                <h1>Hirdetések</h1>
            </div>
            <div className="filters">
                <input type="text" name="name" placeholder="Search by name" value={filters.name} onChange={handleFilterChange} />
                <select name="category" value={filters.category} onChange={handleFilterChange}>
                    <option value="">Select category</option>
                    <option value="Egyetemistáknak">Egyetemistáknak</option>
                    <option value="Középiskolásoknak">Középiskolásoknak</option>
                    <option value="Általános iskolásoknak">Általános iskolásoknak</option>
                    <option value="Kötelező olvasmány">Kötelező olvasmány</option>
                    <option value="Kellékek">Kellékek</option>
                    <option value="Írószerek">Írószerek</option>
                    <option value="Kiegészítők">Kiegészítők</option>
                </select>
                <input type="number" name="minPrice" placeholder="Min price" value={filters.minPrice} onChange={handleFilterChange} />
                <input type="number" name="maxPrice" placeholder="Max price" value={filters.maxPrice} onChange={handleFilterChange} />
                <select name="countyId" value={filters.countyId} onChange={handleFilterChange}>
                    <option value="">Select county</option>
                    {counties.map(county => (
                        <option key={county.id} value={county.id}>{county.nev}</option>
                    ))}
                </select>
                <button onClick={applyFilters}>Apply Filters</button>
            </div>
            <div className="alladspage-content">
                <div className="cards">
                    {filteredAds.map(ad => (
                        <Card key={ad.id} ad={ad} thumbnail={thumbnailImages[ad.id]} />
                    ))}
                </div>
            </div>
        </div>
    );
};
