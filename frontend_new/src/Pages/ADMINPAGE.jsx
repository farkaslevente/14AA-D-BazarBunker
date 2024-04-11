import React, { useState, useEffect } from 'react'
import './CSS/ADMINPAGE.css'
import axios from 'axios';

export const ADMINPAGE = () => {
  const [users, setUsers] = useState([]);
  const [ads, setAds] = useState([]);
  const [support, setSupport] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [selectedTab, setSelectedTab] = useState('users');

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let response = await axios.get('http://localhost:9000/users',
        { headers: { "Authorization": `Bearer ${authToken}` } })
      setUsers(response.data);

      response = await axios.get('http://localhost:9000/ads',
      { headers: { "Authorization": `Bearer ${authToken}` } })
      setAds(response.data);

      response = await axios.get('http://localhost:9000/support',
      { headers: { "Authorization": `Bearer ${authToken}` } })
      setSupport(response.data);

      response = await axios.get('http://localhost:9000/tokens',
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
                </tr>
              </thead>
              <tbody>
                {support.map(supp => (
                  <tr key={supp.id}>
                    <td>{supp.id}</td>
                    <td>{supp.cim}</td>
                    <td>{supp.kerdes}</td>
                    <td>{supp.felhasznaloId}</td>
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
              </tr>
            </thead>
            <tbody>
              {tokens.map(token => (
                <tr key={token.id}>
                  <td>{token.id}</td>
                  <td>{token.data.substring(0, 50) + " ..."}</td>
                  <td>{token.tulajEmail}</td>
                  <td>{token.date}</td>
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
        <button className={selectedTab === 'users'? 'active' : ''} onClick={() => setSelectedTab('users')}>
          Users
        </button>
        <button className={selectedTab === 'ads'? 'active' : ''} onClick={() => setSelectedTab('ads')}>
          Ads
        </button>
        <button className={selectedTab === 'support'? 'active' : ''} onClick={() => setSelectedTab('support')}>
          Support
        </button>
        <button className={selectedTab === 'tokens'? 'active' : ''} onClick={() => setSelectedTab('tokens')}>
          Tokens
        </button>
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
}