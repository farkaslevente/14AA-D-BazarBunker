import React, { useState, useEffect } from 'react'
import './CSS/ADMINPAGE.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ADMINPAGE = () => {
  const [users, setUsers] = useState([]);
  const [ads, setAds] = useState([]);
  const [support, setSupport] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [selectedTab, setSelectedTab] = useState('users');

  // const [userData, setUserData] = useState([]);
  // const [userIsAdmin, setUserIsAdmin] = useState(false);

  const navigate = useNavigate();

  const authToken = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_LOCAL}/users/${userId}`);
      const userData = response.data;
      if (userData.role === 1) {
        // setUserIsAdmin(true);
        fetchData();
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error checking user data:', error);
    }
  };

  const fetchData = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_LOCAL}/users`,
        { headers: { "Authorization": `Bearer ${authToken}` } })
      setUsers(response.data);

      response = await axios.get(`${process.env.REACT_APP_LOCAL}/ads`,
      { headers: { "Authorization": `Bearer ${authToken}` } })
      setAds(response.data);

      response = await axios.get(`${process.env.REACT_APP_LOCAL}/support`,
      { headers: { "Authorization": `Bearer ${authToken}` } })
      setSupport(response.data);

      response = await axios.get(`${process.env.REACT_APP_LOCAL}/tokens`,
      { headers: { "Authorization": `Bearer ${authToken}` } })
      setTokens(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'users':
        return (
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Role</th>
                <th>Favourites</th>
                <th>Phone</th>
                <th>OPTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nev}</td>
                  <td>{user.email}</td>
                  <td>{user.hely}</td>
                  <td>{user.role}</td>
                  <td>{user.kedvencek}</td>
                  <td>{user.telefonszam}</td>
                  <td style={{width: '300px'}}>
                    <button style={{background: 'royalblue'}}>Szerkesztés</button>
                    <button style={{background: 'red', color: 'black', border: '1px solid black'}}>Törlés</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'ads':
        return (
          <table>
            <thead>
              <tr>
                <th>Ad ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>countyId</th>
                <th>Settlements</th>
                <th>ownerId</th>
                <th>Date</th>
                <th>OPTIONS</th>
              </tr>
            </thead>
            <tbody>
              {ads.map(ad => (
                <tr key={ad.id}>
                  <td>{ad.id}</td>
                  <td>{ad.nev}</td>
                  <td>{ad.leiras}</td>
                  <td>{ad.kategoria}</td>
                  <td>{ad.ar}</td>
                  <td>{ad.varmegyeId}</td>
                  <td>{ad.telepules}</td>
                  <td>{ad.tulajId}</td>
                  <td>{ad.datum}</td>
                  <td style={{width: '300px'}}>
                    <button style={{background: 'royalblue'}}>Szerkesztés</button>
                    <button style={{background: 'red', color: 'black', border: '1px solid black'}}>Törlés</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'support':
          return (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>ownerId</th>
                  <th>OPTIONS</th>
                </tr>
              </thead>
              <tbody>
                {support.map(supp => (
                  <tr key={supp.id}>
                    <td>{supp.id}</td>
                    <td>{supp.cim}</td>
                    <td>{supp.kerdes}</td>
                    <td>{supp.felhasznaloId}</td>
                    <td style={{width: '300px'}}>
                    <button style={{background: 'red', color: 'black', border: '1px solid black'}}>Törlés</button>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          );
      case 'tokens':
        return (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Token</th>
                <th>ownerEmail</th>
                <th>Date</th>
                <th>OPTIONS</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map(token => (
                <tr key={token.id}>
                  <td>{token.id}</td>
                  <td>{token.data.substring(0, 50) + " ..."}</td>
                  <td>{token.tulajEmail}</td>
                  <td>{token.date}</td>
                  <td style={{width: '300px'}}>
                    <button style={{background: 'red', color: 'black', border: '1px solid black'}}>Törlés</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
        default:
        return null;
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div className="tab-bar">
        <button className={selectedTab === 'users'? 'active' : ''} onClick={() => setSelectedTab('users')} style={{width: '200px'}}>
          Users
        </button>
        <button className={selectedTab === 'ads'? 'active' : ''} onClick={() => setSelectedTab('ads')} style={{width: '200px'}}>
          Ads
        </button>
        <button className={selectedTab === 'support'? 'active' : ''} onClick={() => setSelectedTab('support')} style={{width: '200px'}}>
          Support
        </button>
        <button className={selectedTab === 'tokens'? 'active' : ''} onClick={() => setSelectedTab('tokens')} style={{width: '200px'}}>
          Tokens
        </button>
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}