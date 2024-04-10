import React, { useEffect, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/bunker.png';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

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
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" className='nav-img-size' />
                <Link to='/' style={{ textDecoration: 'none' }}>BAZARBUNKER</Link>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => setMenu('hirdetesek')}>
                    <Link to='/hirdetesek' style={{ textDecoration: 'none' }}>Hirdetések</Link>
                    {menu === 'hirdetesek' ? <hr /> : null}
                </li>
                {isLoggedIn && (
                    <li onClick={() => setMenu('ujhirdetes')}>
                        <Link to='/ujhirdetes' style={{ textDecoration: 'none' }}>Új hirdetés</Link>
                        {menu === 'ujhirdetes' ? <hr /> : null}
                    </li>
                )}
            </ul>
            {!isLoggedIn ? (
                <div className="nav-login">
                    <Link to='/bejelentkezes' style={{ textDecoration: 'none' }}>
                        <button>Bejelentkezés</button>
                    </Link>
                </div>
            ) : (
                <div className='loggedInUser'>
                    <div className="loggedIn">
                        <div className='loggedIndata' style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '10px', marginLeft: '10px' }}>
                            <h5>Bejelentkezve: <strong><Link to='/profil' style={{color: "black"}}>{localStorage.getItem('userName')}</Link></strong></h5>
                            <img className='userPPic' src={localStorage.getItem('userPPic')} alt="Profilkep" />
                        </div>
                        <div>
                            <Link onClick={handleLogout} to='/' style={{ color: 'gray', marginLeft: '10px' }}>Kijelentkezés</Link>
                            {isAdmin && <Link to='/adminpage' style={{ color: 'gray', marginLeft: '10px' }}>Adminpage</Link>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
