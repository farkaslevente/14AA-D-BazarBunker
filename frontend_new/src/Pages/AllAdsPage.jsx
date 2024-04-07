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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn === 'true');
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);

        const fetchData = async () => {
            try {
                const adsData = await adservice.getAllAds();
                setAds(adsData);
                setFilteredAds(adsData);
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

                const thumbnails = {};
                imageFileNames.forEach(fileName => {
                    const [fetchedUserId, adId, index] = fileName.split('_');
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

    useEffect(() => {
        applyFilters();
    }, [filters, ads]);

    const applyFilters = () => {
        let filtered = [...ads];

        if (filters.name) {
            filtered = filtered.filter(ad => ad.nev.toLowerCase().includes(filters.name.toLowerCase()));
        }

        if (filters.category) {
            filtered = filtered.filter(ad => ad.kategoria === filters.category);
        }

        if (filters.minPrice && filters.maxPrice) {
            filtered = filtered.filter(ad => ad.ar >= parseFloat(filters.minPrice) && ad.ar <= parseFloat(filters.maxPrice));
        }

        if (filters.countyId) {
            filtered = filtered.filter(ad => ad.varmegyeId === parseInt(filters.countyId));
        }

        if (isLoggedIn && userId) {
            filtered = filtered.filter(ad => ad.tulajId !== parseInt(userId));
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

    const resetFilters = () => {
        setFilters({
            name: '',
            category: '',
            minPrice: '',
            maxPrice: '',
            countyId: '',
        });
        setFilteredAds(ads);
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
                <button onClick={resetFilters}>Reset Filters</button>
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
