import React, { useState, useEffect } from 'react'
import './CSS/ADMINPAGE.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

export const ADMINPAGE = () => {
  const [users, setUsers] = useState([]);
  const [ads, setAds] = useState([]);
  const [support, setSupport] = useState([]);
  const [tokens, setTokens] = useState([]);
  const [selectedTab, setSelectedTab] = useState('users');

  const [selectedUserItem, setselectedUserItem] = useState(null);
  const [selectedAdItem, setSelectedAdItem] = useState(null);
  const [selectedSupportItem, setSelectedSupportItem] = useState(null);
  const [selectedTokenItem, setSelectedTokenItem] = useState(null);

  //Modal - userModal
  const [isUserModalOpen, setisUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setisDeleteUserModalOpen] = useState(false);

  //Modal -adModal
  const [isEditAdModalOpen, setIsEditAdModalOpen] = useState(false);
  const [isDeleteAdModalOpen, setIsDeleteAdModalOpen] = useState(false);

  //Modal - supportModal
  const [isDeleteSupportModalOpen, setIsDeleteSupportModalOpen] = useState(false);

  //Modal - tokenModal
  const [isDeleteTokenModalOpen, setIsDeleteTokenModalOpen] = useState(false);

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

  //UserModals
  const openUserModal = (item) => {
    setselectedUserItem(item);
    setisUserModalOpen(true);
  };

  const closeUserModal = () => {
    setselectedUserItem(null);
    setisUserModalOpen(false);
  };

  const handleUserSave = async () => {
    try {
      const editedUser = {
        id: selectedUserItem.id,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        location: document.getElementById('location').value,
        pPic: document.getElementById('pPic').value,
        role: document.getElementById('role').value,
        favourites: document.getElementById('favourites').value,
        phone: document.getElementById('phone').value,
      };

      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      await axios.put(`${process.env.REACT_APP_LOCAL}/users/edit`, editedUser, { headers });
      closeUserModal();
      alert("Sikeres adat változtatás!");
      window.location.reload();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const openDeleteUserModal = (item) => {
    setselectedUserItem(item);
    setisDeleteUserModalOpen(true);
  };

  const closeDeleteUserModal = () => {
    setselectedUserItem(null);
    setisDeleteUserModalOpen(false);
  };

  const handleUserDelete = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      await axios.delete(`${process.env.REACT_APP_LOCAL}/users/remove/${selectedUserItem.id}`, { headers });
      closeDeleteUserModal();
      alert("Sikeres törlés!")
      window.location.reload();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  //AdModals
  const openEditAdModal = (item) => {
    setSelectedAdItem(item);
    setIsEditAdModalOpen(true);
  };

  const closeEditAdModal = () => {
    setSelectedAdItem(null);
    setIsEditAdModalOpen(false);
  };

  const handleAdSave = async () => {
    try {
      const editedAd = {
        name: document.getElementById('adName').value,
        description: document.getElementById('adDescription').value,
        category: document.getElementById('adCategory').value,
        price: parseFloat(document.getElementById('adPrice').value),
        countyId: parseInt(document.getElementById('adCountyId').value),
        settlement: document.getElementById('adSettlement').value,
        userId: document.getElementById('adOwnerId').value
      };

      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      await axios.put(`${process.env.REACT_APP_LOCAL}/ads/edit/${selectedAdItem.id}`, editedAd, { headers });
      closeEditAdModal();
      alert("Hirdetés sikeresen megváltoztatva!");
      window.location.reload();
    } catch (error) {
      console.error('Error updating ad:', error);
    }
  };

  const openDeleteAdModal = (item) => {
    setSelectedAdItem(item);
    setIsDeleteAdModalOpen(true);
  };

  const closeDeleteAdModal = () => {
    setSelectedAdItem(null);
    setIsDeleteAdModalOpen(false);
  };

  const handleAdDelete = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      await axios.delete(`${process.env.REACT_APP_LOCAL}/ads/remove/${selectedAdItem.id}`, { headers });
      closeDeleteAdModal();
      alert("Hirdetés törölve!")
      window.location.reload();
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  //SupportModal
  const openDeleteSupportModal = (item) => {
    setSelectedSupportItem(item);
    setIsDeleteSupportModalOpen(true);
  };

  const closeDeleteSupportModal = () => {
    setSelectedSupportItem(null);
    setIsDeleteSupportModalOpen(false);
  };

  const handleSupportDelete = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      const body = {
        id: selectedSupportItem.id
      }

      await axios.delete(`${process.env.REACT_APP_LOCAL}/support/${selectedSupportItem.id}`, { headers });
      closeDeleteSupportModal();
      alert("Support kérdés törölve!");
      window.location.reload();
    } catch (error) {
      console.error('Error deleting support item:', error);
    }
  };


  //TokenModal
  const openDeleteTokenModal = (item) => {
    setSelectedTokenItem(item);
    setIsDeleteTokenModalOpen(true);
  };

  const closeDeleteTokenModal = () => {
    setSelectedTokenItem(null);
    setIsDeleteTokenModalOpen(false);
  };

  const handleTokenDelete = async () => {
    try {
      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      await axios.delete(`${process.env.REACT_APP_LOCAL}/tokens/${selectedTokenItem.id}`, { headers });
      closeDeleteTokenModal();
      alert("Sikeres token törlés!");
      window.location.reload();
    } catch (error) {
      console.error('Error deleting token:', error);
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
                <th>ProfilePic</th>
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
                  <td>{user.pPic}</td>
                  <td>{user.role}</td>
                  <td>{user.kedvencek}</td>
                  <td>{user.telefonszam}</td>
                  <td style={{ width: '300px' }}>
                    <button style={{ background: 'royalblue' }} onClick={() => openUserModal(user)}>Szerkesztés</button>
                    <button style={{ background: 'red', color: 'black', border: '1px solid black' }} onClick={() => openDeleteUserModal(user)}>Törlés</button>
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
                  <td style={{ width: '300px' }}>
                    <button style={{ background: 'royalblue' }} onClick={() => openEditAdModal(ad)}>Szerkesztés</button>
                    <button style={{ background: 'red', color: 'black', border: '1px solid black' }} onClick={() => openDeleteAdModal(ad)}>Törlés</button>
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
                  <td style={{ width: '300px' }}>
                    <button style={{ background: 'red', color: 'black', border: '1px solid black' }} onClick={() => openDeleteSupportModal(supp)}>Törlés</button>
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
                  <td style={{ width: '300px' }}>
                    <button style={{ background: 'red', color: 'black', border: '1px solid black' }} onClick={() => openDeleteTokenModal(token)}>Törlés</button>
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
        <button className={selectedTab === 'users' ? 'active' : ''} onClick={() => setSelectedTab('users')} style={{ width: '200px' }}>
          Users
        </button>
        <button className={selectedTab === 'ads' ? 'active' : ''} onClick={() => setSelectedTab('ads')} style={{ width: '200px' }}>
          Ads
        </button>
        <button className={selectedTab === 'support' ? 'active' : ''} onClick={() => setSelectedTab('support')} style={{ width: '200px' }}>
          Support
        </button>
        <button className={selectedTab === 'tokens' ? 'active' : ''} onClick={() => setSelectedTab('tokens')} style={{ width: '200px' }}>
          Tokens
        </button>
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>


      {/* UserEditModal */}
      <Modal
        isOpen={isUserModalOpen}
        onRequestClose={closeUserModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: 'fit-content',
            height: 'fit-content',
            padding: '20px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid black',
            textAlign: 'center'
          },
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)', },
        }}
      >
        {selectedUserItem && (
          <div>
            <h2>User szerkesztés</h2>
            <div className="usereditmodal-content">
              <label>Felhasználónév:<br /><input id='name' type="text" defaultValue={selectedUserItem.nev} /></label>
              <label>Email:<br /><input id='email' type="email" defaultValue={selectedUserItem.email} /></label>
              <label>hely:<br /><input id='location' type="text" defaultValue={selectedUserItem.hely} /></label>
              <label>ProfileKép:<br /><input id='pPic' type="text" defaultValue={selectedUserItem.pPic} /></label>
              <label>Role:<br /><input id='role' type="text" defaultValue={selectedUserItem.role} /></label>
              <label>Kedvencek:<br /><input id='favourites' type="text" defaultValue={selectedUserItem.kedvencek} /></label>
              <label>Telefonszám:<br /><input id='phone' type="tel" minLength={11} maxLength={11} defaultValue={selectedUserItem.telefonszam} /></label>
            </div>
            <button onClick={handleUserSave}>Mentés</button>
            <button onClick={closeUserModal}>Mégse</button>
          </div>
        )}
      </Modal>
      {/* UserDeleteModal */}
      <Modal
        isOpen={isDeleteUserModalOpen}
        onRequestClose={closeDeleteUserModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: 'fit-content',
            height: 'fit-content',
            padding: '20px',
            border: '2px solid red',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        {selectedUserItem && (
          <div>
            <h2>Felhasználó törlése</h2>
            <p>Biztosan szeretné törölni ezt a felhasználót? "<i>{selectedUserItem.nev}</i>"</p>
            <button onClick={handleUserDelete} style={{ background: 'red', color: 'black', border: '1px solid black' }}>Törlés</button>
            <button onClick={closeDeleteUserModal}>Mégse</button>
          </div>
        )}
      </Modal>


      {/* AdEditModal */}
      <Modal
        isOpen={isEditAdModalOpen}
        onRequestClose={closeEditAdModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: 'fit-content',
            height: 'fit-content',
            padding: '20px',
            border: '2px solid black',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        {selectedAdItem && (
          <div style={{ textAlign: 'center' }}>
            <h2>Hirdetés szerkesztése</h2>
            <div className='adeditmodal-content'>
              <label>Hirdető ID: <input id="adOwnerId" type="number" defaultValue={selectedAdItem.tulajId} disabled /></label>
              <label>Megnevezés: <input id="adName" type="text" defaultValue={selectedAdItem.nev} /></label>
              <label>Leírás: <input id="adDescription" type="text" defaultValue={selectedAdItem.leiras} /></label>
              <label>Kategória: <input id="adCategory" type="text" defaultValue={selectedAdItem.kategoria} /></label>
              <label>Ár: <input id="adPrice" type="number" defaultValue={selectedAdItem.ar} /></label>
              <label>Vármegye ID: <input id="adCountyId" type="number" defaultValue={selectedAdItem.varmegyeId} /></label>
              <label>Hely: <input id="adSettlement" type="text" defaultValue={selectedAdItem.telepules} /></label>
            </div>
            <button onClick={handleAdSave}>Mentés</button>
            <button onClick={closeEditAdModal}>Mégse</button>
          </div>
        )}
      </Modal>
      {/* DeleteAdModal */}
      <Modal
        isOpen={isDeleteAdModalOpen}
        onRequestClose={closeDeleteAdModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: 'fit-content',
            height: 'fit-content',
            padding: '20px',
            border: '2px solid red',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        {selectedAdItem && (
          <div>
            <h2>Hirdetés törlése</h2>
            <p>bztosan szeretné törölni ezt a hirdetést? "<i>{selectedAdItem.nev}</i>"</p>
            <button onClick={handleAdDelete} style={{ background: 'red', color: 'black', border: '1px solid black' }}>Törlés</button>
            <button onClick={closeDeleteAdModal}>Mégse</button>
          </div>
        )}
      </Modal>


      {/* DeleteSupportModal */}
      <Modal
        isOpen={isDeleteSupportModalOpen}
        onRequestClose={closeDeleteSupportModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: 'fit-content',
            height: 'fit-content',
            padding: '20px',
            border: '2px solid red',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        {selectedSupportItem && (
          <div style={{ textAlign: 'center' }}>
            <h2>Support törlés</h2>
            <p>Biztosan ki szeretné törölni ezt a beérkezett kérdést? "<i>{selectedSupportItem.cim}</i>"</p>
            <p>ID: <i><b>{selectedSupportItem.id}</b></i></p>
            <button onClick={handleSupportDelete} style={{ background: 'red', color: 'black', border: '1px solid black' }}>Törlés</button>
            <button onClick={closeDeleteSupportModal}>Mégse</button>
          </div>
        )}
      </Modal>

      {/* DeletetokenModal */}
      <Modal
        isOpen={isDeleteTokenModalOpen}
        onRequestClose={closeDeleteTokenModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: 'fit-content',
            height: 'fit-content',
            padding: '20px',
            border: '2px solid red',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        {selectedTokenItem && (
          <div style={{textAlign: 'center'}}>
            <h2>Token törlés</h2>
            <p>biztosan szertné törölni ezt a tokent?</p>
            <p>ID: <i><b>{selectedTokenItem.id}</b></i></p>
            <button onClick={handleTokenDelete} style={{ background: 'red', color: 'black', border: '1px solid black' }}>Törlés</button>
            <button onClick={closeDeleteTokenModal}>Mégse</button>
          </div>
        )}
      </Modal>
    </div>
  );
}