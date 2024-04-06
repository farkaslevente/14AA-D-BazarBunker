import React, { useEffect, useState } from 'react';
import AdDetailsCarousel from '../Components/AdDetailsCarousel/AdDetailsCarousel';
import './CSS/AdDetailsPage.css';
import { useParams } from 'react-router-dom';
import adservice from '../Services/adservice';
import axios from 'axios';

export const AdDetailsPage = () => {
    const { id } = useParams();
    const adId = parseInt(id);
    const [ad, setAd] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [advertiser, setAdvertiser] = useState(null);
    const [formattedDate, setFormattedDate] = useState('');
    

    useEffect(() => {
        const fetchAdDetails = async () => {
            try {
                const adsData = await adservice.getAllAds();
                const selectedAd = adsData.find(ad => ad.id === adId);
                setAd(selectedAd);
                if (selectedAd.tulajId) {
                    const response = await axios.get(`${process.env.REACT_APP_LOCAL}/users/${selectedAd.tulajId}`);
                    setAdvertiser(response.data);
                }
                const date = new Date(selectedAd.datum);
                const formattedDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
                setFormattedDate(formattedDate);
            } catch (error) {
                console.error('Error fetching ad details:', error);
            }
        };

        const fetchImages = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_LOCAL}/pictures/upload`);
                const filteredImages = response.data.filter(fileName => {
                    const [userId, fetchedAdId, _] = fileName.split('_');
                    return parseInt(fetchedAdId) === adId;
                }).map(fileName => `${process.env.REACT_APP_LOCAL}/uploads/${fileName}`);
                setImageUrls(filteredImages);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchAdDetails();
        fetchImages();
    }, [adId]);

    return (
        <div className='addetailspage'>
            <h1>Hirdetés részletek</h1>
            <div className="addetails">
                <div className="carousel">
                    <AdDetailsCarousel imageUrls={imageUrls} className='carousel' />
                </div>
                <div className="addetails-data">
                    <h4 id="title" style={{ textDecoration: 'underline' }}>Megnevezés: <strong><i>{ad ? ad.nev : ''}</i></strong></h4>

                    <label htmlFor="price">Ár:</label>
                    <p id="price">{ad ? ad.ar : ''} Ft</p>

                    <label htmlFor="location">Település:</label>
                    <p id="location">{ad ? ad.telepules : ''}</p>

                    <label htmlFor="advertiser">Hirdető neve:</label>
                    <p id="advertiser">{advertiser ? advertiser.name : ''}</p>

                    <label htmlFor="phone">Hirdető telefonszáma:</label>
                    <i>
                        <p id="phone">{advertiser ? advertiser.phone : ''}</p>
                    </i>

                    <label htmlFor="date">Hirdetés létrehozva:</label>
                    <p id="date">{formattedDate}</p>

                    <label htmlFor="description">Leírás:</label>
                    <p id="description">{ad ? ad.leiras : ''}</p>

                    <label htmlFor="favorite" style={{ marginRight: '10px' }}>Hozzáadás a kedvencekhez: </label>
                    <input type="checkbox" name="favorite" id="favorite" />
                </div>
            </div>
        </div>
    );
};

export default AdDetailsPage;
