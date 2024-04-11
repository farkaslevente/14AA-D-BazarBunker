import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/smalllogo.png';

export const Navbar = () => {
    const [menu, setMenu] = useState('hirdetes');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem('authUser'));
        const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
        const role = JSON.parse(localStorage.getItem('userRole'));
        if (authUser) {
            setUser(authUser);
        }
        if (role === 1) {
            setIsAdmin(true);
        }
        setIsLoggedIn(loggedIn);
    }, [isLoggedIn]);

    function handleLogout() {
        localStorage.clear();
        localStorage.setItem('isLoggedIn', false);
        navigate('/');
        window.location.reload();
    }

    return (
        <div className='navbar' style={{borderBottom: '3px solid black', borderTop: '3px solid black'}}>
            <div className="nav-logo">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <img src={logo} alt="" className='nav-img-size' />
                </Link>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => setMenu('hirdetesek')}>
                    <Link to='/hirdetesek' style={{ textDecoration: 'none', color: '#FF9843' }}>Hirdetések</Link>
                    {menu === 'hirdetesek' ? <hr /> : null}
                </li>
                {isLoggedIn && (
                    <li onClick={() => setMenu('ujhirdetes')}>
                        <Link to='/ujhirdetes' style={{ textDecoration: 'none', color: '#FF9843' }}>Új hirdetés</Link>
                        {menu === 'ujhirdetes' ? <hr /> : null}
                    </li>
                )}
            </ul>
            {!isLoggedIn ? (
                <div className="nav-login">
                    <Link to='/bejelentkezes' style={{ textDecoration: 'none' }}>
                        <button style={{color: 'black'}}>Bejelentkezés</button>
                    </Link>
                </div>
            ) : (
                <div className='loggedInUser'>
                    <div className="loggedIn">
                        <div className='loggedIndata' style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '10px', marginLeft: '10px' }}>
                            <h5 style={{color: '#FF9843'}}>Bejelentkezve: <strong><Link to='/profil' style={{ color: "white", outline: 'black' }}>{localStorage.getItem('userName')}</Link></strong></h5>
                            <img className='userPPic' src={localStorage.getItem('userPPic')} alt="Profilkep" style={{background: 'white'}}/>
                        </div>
                        <div>
                            <Link onClick={handleLogout} to='/' style={{ color: '#FFDD95', marginLeft: '10px' }}>Kijelentkezés</Link>
                            {isAdmin && <Link to='/adminpage' style={{ color: '#FFDD95', marginLeft: '10px' }}>Adminpage</Link>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
