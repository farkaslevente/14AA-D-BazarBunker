import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/NewAdPage.css';
import Select from 'react-select';
import adservice from './../Services/adservice';
import { useNavigate } from 'react-router-dom';

export const NewAdPage = () => {
    const navigate = useNavigate();

    const [counties, setCounties] = useState([]);
    const [selectedCounty, setSelectedCounty] = useState('');
    const [selectedCountyId, setSelectedCountyId] = useState('');
    const [settlements, setSettlements] = useState([]);
    const [settlementOptions, setSettlementOptions] = useState([]);
    const [settlementDisabled, setSettlementDisabled] = useState(true);
    const [description, setDescription] = useState('');
    const [authToken, setAuthToken] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSettlement, setSelectedSettlement] = useState('');
    const [images, setImages] = useState([]);

    const categoryOptions = [
        { value: 'Egyetemistáknak', label: 'Egyetemistáknak' },
        { value: 'Középiskolásoknak', label: 'Középiskolásoknak' },
        { value: 'Általános iskolásoknak', label: 'Általános iskolásoknak' },
        { value: 'Kötelező olvasmány', label: 'Kötelező olvasmány' },
        { value: 'Kellékek', label: 'Kellékek' },
        { value: 'Írószerek', label: 'Írószerek' },
        { value: 'Kiegészítők', label: 'Kiegészítők'}
    ];

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setAuthToken(token);
        Promise.all([adservice.getCounties(), adservice.getSettlements()])
            .then(([countiesData, settlementsData]) => {
                const formattedCounties = countiesData.map(county => ({
                    label: county.nev,
                    value: county.nev,
                    id: county.id
                }));
                setCounties(formattedCounties);

                setSettlements(settlementsData);
                setSettlementOptions(settlementsData.map(settlement => ({
                    label: settlement.nev,
                    value: settlement.nev
                })));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleCountyChange = (selectedOption) => {
        setSelectedCounty(selectedOption);

        const filteredSettlements = settlements.filter(settlement => settlement.varmegye === selectedOption.value);
        setSettlementOptions(filteredSettlements.map(settlement => ({
            label: settlement.nev,
            value: settlement.nev
        })));

        setSettlementDisabled(false);
        setSelectedCountyId(selectedOption.id);
    };

    const handleSettlementChange = (selectedOption) => {
        setSelectedSettlement(selectedOption);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption.value);
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setImages(files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const countyId = selectedCounty.value;
            const authToken = localStorage.getItem('authToken');
            const headers = {
                'Authorization': `Bearer ${authToken}`
            };

            await axios.post(`${process.env.REACT_APP_LOCAL}/ads`, {
                name: event.target.title.value,
                description,
                category: selectedCategory,
                price: event.target.price.value,
                countyId: selectedCounty.id,
                ownerId: localStorage.getItem('userId'),
                settlement: selectedSettlement.value,
            }, { headers });

            const ads = await adservice.getAllAds();
            const adIds = ads.map(ad => ad.id);
            const maxId = Math.max(...adIds);
            const ADID = maxId;

            const formData = new FormData();
            images.forEach((file, index) => {
                formData.append(`file`, file, `${localStorage.getItem('userId')}_${ADID}_${index}.${file.name.split('.').pop()}`);
            });

            await axios.post(`${process.env.REACT_APP_LOCAL}/pictures/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authToken}`
                }
            });

            //console.log('Ad posted successfully!');
            //console.log('Images uploaded', response.data);
            alert("Sikeres közlés!");
            navigate('/hirdetesek');
        } catch (error) {
            //console.error('Error posting ad:', error);
            //setMessage("Sikertelen közzététel!")
        }
    };

    return (
        <div className='newadpage'>
            <div className="newadpage-title">
                <h1>Új hirdetés</h1>
            </div>
            <div className="newadpage-content">
                <form className='newadform' onSubmit={handleSubmit}>
                    <div className="data1">
                        <label htmlFor="title">Hirdetés megnevezése:</label>
                        <input type="text" name='title' placeholder='pl: Ceruza (maximum 25 karakter)' required maxLength={25} style={{textAlign: 'center'}}/>
                        <label htmlFor="county">Hirdetés megye:</label>
                        <Select
                            value={selectedCounty}
                            onChange={handleCountyChange}
                            options={counties}
                            placeholder="Válasszon megyét..."
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    border: '1px solid gray',
                                    borderRadius: '10px',
                                    background: 'white'
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    border: '1px solid gray',
                                    borderRadius: '10px',
                                    background: 'white'
                                }),
                            }}
                            required
                        />
                        <label htmlFor="settlement">Hirdetés pontos helye:</label>
                        <Select
                            value={selectedSettlement}
                            onChange={handleSettlementChange}
                            options={settlementOptions}
                            isDisabled={settlementDisabled}
                            placeholder="Válasszon települést..."
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    border: '1px solid gray',
                                    borderRadius: '10px',
                                    background: 'white'
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    border: '1px solid gray',
                                    borderRadius: '10px',
                                    background: 'white'
                                }),
                            }}
                            required
                        />
                        <label htmlFor="category">Kategória:</label>
                        <Select
                            value={selectedCategory.value}
                            onChange={handleCategoryChange}
                            options={categoryOptions}
                            placeholder="Válasszon kategóriát..."
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    border: '1px solid gray',
                                    borderRadius: '10px',
                                    background: 'white'
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    border: '1px solid gray',
                                    borderRadius: '10px',
                                    background: 'white'
                                }),
                            }}
                            required
                        />
                        <label htmlFor="price">{'Ár (Ft):'}</label>
                        <input type="text" name='price' placeholder='pl: 2000' required autoComplete='off' maxLength={10} style={{textAlign: 'center'}}/>

                        <label htmlFor="description">Leírás:</label>
                        <textarea
                            name="description"
                            id="description"
                            rows="4"
                            cols="50"
                            value={description}
                            onChange={handleDescriptionChange}
                            required
                            placeholder='Rövid leírás: (maximum 250 karakter)'
                            maxLength={250}
                        ></textarea>

                        <label htmlFor="image">{'Töltsön fel képeket! (minimum 1 - maximum 6)'}</label>
                        <input
                            type="file"
                            name='file'
                            id='images'
                            accept='.png, .jpg, .jpeg'
                            onChange={handleImageChange}
                            on
                            multiple
                            max={6}
                            required
                        />
                        <button type='submit' id='formButton' style={{margin: 'auto', height: 'fit-content'}}>Hirdetés közzététele</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

