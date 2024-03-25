import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/bunker.png'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  const [menu, setMenu] = useState("hirdetes");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState([]);

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (authUser) {
      setUser(authUser);
    }
    setIsLoggedIn(loggedIn);
  }, [isLoggedIn]);

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" className='nav-img-size' />
        <a href='/' style={{ textDecoration: 'none' }}>BAZARBUNKER</a>
      </div>
      <ul className='nav-menu'>
        <li onClick={() => { setMenu("hirdetesek") }}><Link style={{ textDecoration: 'none' }} to='/hirdetesek'>Hirdetések</Link>{menu === "hirdetesek" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("ujhirdetes") }}><Link style={{ textDecoration: 'none' }} to='/ujhirdetes'>Új hirdetés</Link>{menu === "ujhirdetes" ? <hr /> : <></>}</li>
      </ul>
      {!isLoggedIn && <div className="nav-login">
        <Link style={{ textDecoration: 'none' }} to='/bejelentkezes'><button style={{ color: 'black' }}>Bejelentkezés</button></Link>
      </div>}
      {user && <div>{user.email}</div>}
    </div>
  )
}
