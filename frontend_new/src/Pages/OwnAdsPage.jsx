import React, { useState, useEffect } from 'react';
import axios from 'axios';
import adservice from './../Services/adservice';
import Modal from 'react-modal';
import Select from 'react-select';
import './CSS/OwnAdsPage.css';
import { Link, useNavigate } from 'react-router-dom';

export const OwnAdsPage = () => {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [userAds, setUserAds] = useState([]);
    const [error, setError] = useState(null);
    const [selectedAdId, setSelectedAdId] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedAd, setEditedAd] = useState(null);

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
        { value: 'Egyetemistáknak', label: 'Egyetemistáknak' },
        { value: 'Középiskolásoknak', label: 'Középiskolásoknak' },
        { value: 'Általános iskolásoknak', label: 'Általános iskolásoknak' },
        { value: 'Kötelező olvasmány', label: 'Kötelező olvasmány' },
        { value: 'Kellékek', label: 'Kellékek' },
        { value: 'Írószerek', label: 'Írószerek' },
        { value: 'Kiegészítők', label: 'Kiegészítők' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await adservice.getAllAds();
                const filteredAds = data.filter(ad => ad.tulajId === parseInt(userId));
                setUserAds(filteredAds);
            } catch (error) {
                setError(error);
            }
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
        };

        fetchData();
    }, [userId]);

    const handleDeleteConfirmation = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_LOCAL}/ads/${selectedAdId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            setUserAds(prevAds => prevAds.filter(ad => ad.id !== selectedAdId));
            setShowDeleteConfirmation(false);
        } catch (error) {
            console.error('Error deleting ad:', error.message);
        }
    };

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
        setSelectedCategory(selectedOption);
    };

    const handleSubmit = async () => {
        try {
            const selectedCountyObject = counties.find(county => county.value === selectedCounty.value);
            const countyId = selectedCountyObject ? selectedCountyObject.id : '';

            await axios.post(`${process.env.REACT_APP_LOCAL}/ads/${selectedAdId}`, {
                name: editedAd.nev,
                description: editedAd.leiras,
                category: selectedCategory.value,
                price: editedAd.ar,
                countyId: countyId,
                settlement: selectedSettlement.value
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                }
            });

        } catch (error) {
            console.error('Error posting ads!', error.message);
        }
    };


    const handleEdit = async (adId) => {

        try {
            setSelectedAdId(adId);
            const adDetails = userAds.find(ad => ad.id === adId);

            const countyId = adDetails.varmegyeId;
            const countyObject = counties.find(county => county.id === countyId);

            setSelectedCounty(countyObject);

            const settlementObject = settlementOptions.find(settlement => settlement.value === adDetails.telepules);
            setSelectedSettlement(settlementObject);

            const adCategory = categoryOptions.find(option => option.value === adDetails.kategoria);
            setSelectedCategory(adCategory);

            setEditedAd(adDetails);
            setShowEditModal(true);
        } catch (error) {
            console.error('Error fetching ad details:', error.message);
        }
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="ownadspage">
            <h1 className="ownadspage-title">Saját Hirdetések</h1>
            <div className="ownadspage-content">
                <table>
                    <thead>
                        <tr>
                            <th>Megnevezés</th>
                            <th>Hozzáadva</th>
                            <th>Lehetőségek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userAds.map(ad => (
                            <tr key={ad.id}>
                                <td><Link to={`/hirdetes/${ad.id}`} style={{color: 'black'}}>{ad.nev}</Link></td>
                                <td>{new Date(ad.datum).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleEdit(ad.id)}>Szerkesztés</button>
                                    <button
                                        onClick={() => {
                                            setSelectedAdId(ad.id);
                                            setShowDeleteConfirmation(true);
                                        }}
                                        style={{ background: 'red', border: '1px solid black', color: 'black' }}
                                    >
                                        Törlés
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={showDeleteConfirmation}
                onRequestClose={() => setShowDeleteConfirmation(false)}
                contentLabel="Delete Confirmation"
                ariaHideApp={false}
                style={{
                    overlay: {
                        zIndex: 1000,
                    },
                    content: {
                        width: 'fit-content',
                        height: 'fit-content',
                        textAlign: 'center',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: '2px solid red',
                        borderRadius: '20px',
                    },
                }}
            >
                <h2>Biztosan szeretné törölni ezt a hirdetést?</h2>
                <div>
                    <button onClick={handleDeleteConfirmation} style={{ background: 'red', border: '1px solid black', color: 'black' }}>Igen</button>
                    <button onClick={() => setShowDeleteConfirmation(false)}>Nem</button>
                </div>
            </Modal>
            <Modal
                isOpen={showEditModal}
                onRequestClose={() => setShowEditModal(false)}
                contentLabel="Edit Ad"
                ariaHideApp={false}
                style={{
                    overlay: {
                        zIndex: 1000,
                    },
                    content: {
                        width: 'fit-content',
                        height: '700px',
                        marginTop: '100px',
                        marginBottom: '100px',
                        paddingTop: '30px',
                        textAlign: 'center',
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: '2px solid blue',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        overflowY: 'auto',
                    },
                }}
            >
                <h1>Szerkesztés</h1>
                <form className='editadform' onSubmit={handleSubmit}>
                    <div className="data1">
                        <label htmlFor="title">Hirdetés megnevezése:</label>
                        <input className='rounded' type="text" name='title' placeholder='pl: Ceruza (maximum 25 karakter)' required maxLength={25} style={{ textAlign: 'center', border: '1px solid gray', marginBottom: '20px' }} value={editedAd ? editedAd.nev : ''} onChange={(e) => setEditedAd({ ...editedAd, nev: e.target.value })} />
                        <label htmlFor="county">Hirdetés vármegye:</label>
                        <Select
                            defaultValue={selectedCounty}
                            value={selectedCounty}
                            onChange={handleCountyChange}
                            options={counties}
                            placeholder="Válasszon vármegyét..."
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    border: '1px solid gray',
                                    borderRadius: '10px',
                                    background: 'white',
                                    marginBottom: '20px'
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
                                    background: 'white',
                                    marginBottom: '20px'
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
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            options={categoryOptions}
                            placeholder="Válasszon kategóriát..."
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    border: '1px solid gray',
                                    borderRadius: '10px',
                                    background: 'white',
                                    marginBottom: '20px'
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
                        <input className='rounded' type="text" name='price' placeholder='pl: 2000' required autoComplete='off' maxLength={10} style={{ textAlign: 'center', border: '1px solid gray', marginBottom: '20px' }} value={editedAd ? editedAd.ar : ''} onChange={(e) => setEditedAd({ ...editedAd, ar: e.target.value })} />

                        <label htmlFor="description">Leírás:</label>
                        <textarea
                            className='rounded'
                            style={{marginBottom: '20px'}}
                            name="description"
                            id="description"
                            rows="4"
                            cols="50"
                            value={editedAd ? editedAd.leiras : ''}
                            onChange={(e) => setEditedAd({ ...editedAd, leiras: e.target.value })}
                            required
                            placeholder='Rövid leírás: (maximum 250 karakter)'
                            maxLength={250}
                        ></textarea>
                        <button type='submit' id='formButton' style={{ margin: 'auto', height: 'fit-content', marginTop: '10px', marginBottom: '20px' }}>Mentés</button>
                        <p>A feltöltött képek szerkesztése jelenleg nem lehetséges!</p>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default OwnAdsPage;
