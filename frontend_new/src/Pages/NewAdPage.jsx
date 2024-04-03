import React, { useState, useEffect } from 'react';
import adservice from '../Services/adservice';
import axios from 'axios';
import './CSS/NewAdPage.css';
import Select from 'react-select';

export const NewAdPage = () => {
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

    const categoryOptions = [
        { value: 'Egyetem', label: 'Egyetem' },
        { value: 'Középiskola', label: 'Középiskola' },
        { value: 'Általános iskola', label: 'Általános iskola' },
        { value: 'Könyv', label: 'Könyv' },
        { value: 'Írószer', label: 'Írószer' },
        { value: 'Bútor', label: 'Bútor' }
    ];

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setAuthToken(token);
        Promise.all([adservice.getCounties(), adservice.getSettlements()])
            .then(([countiesData, settlementsData]) => {
                const formattedCounties = countiesData.map(county => ({
                    label: county.nev,
                    value: county.nev, // Assuming county ID is used
                    id: county.id // Store the county ID
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
        setSelectedCountyId(selectedOption.id); // Set selected county ID
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
                settlement: selectedSettlement.value
            }, { headers });
            //miamanó

            console.log('Ad posted successfully!');
        } catch (error) {
            console.error('Error posting ad:', error);
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
                        <input type="text" name='title' placeholder='pl: Asztal' required />
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
                        <input type="text" name='price' placeholder='pl: 2000' required autoComplete='off'/>

                        <label htmlFor="description">Leírás:</label>
                        <textarea
                            name="description"
                            id="description"
                            rows="4"
                            cols="50"
                            value={description}
                            onChange={handleDescriptionChange}
                            required
                        ></textarea>

                        <label htmlFor="image">{'Töltsön fel képeket! (minimum 1 - maximum 6)'}</label>
                        <input type="file" name='images' id='images' accept='image/*' multiple max={6} />
                        <button type='submit' id='formButton'>Hirdetés közzététele</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
