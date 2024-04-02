import React, { useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/bunker.png'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

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

  function handleLogout() {
    localStorage.clear()
    localStorage.setItem('isLoggedIn', false);
    window.location.reload();
  }

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" className='nav-img-size' />
        <a href='/' style={{ textDecoration: 'none' }}>BAZARBUNKER</a>
      </div>
      <ul className='nav-menu'>
        <li onClick={() => { setMenu("hirdetesek") }}><Link style={{ textDecoration: 'none' }} to='/hirdetesek'>Hirdetések</Link>{menu === "hirdetesek" ? <hr /> : <></>}</li>
        {isLoggedIn && <li onClick={() => { setMenu("ujhirdetes") }}><Link style={{ textDecoration: 'none' }} to='/ujhirdetes'>Új hirdetés</Link>{menu === "ujhirdetes" ? <hr /> : <></>}</li>}
      </ul>
      {!isLoggedIn && <div className="nav-login">
        <Link style={{ textDecoration: 'none' }} to='/bejelentkezes'><button style={{ color: 'black' }}>Bejelentkezés</button></Link>
      </div>}
      {isLoggedIn && <div className='loggedInUser'>
        <h5>Bejelentkezve: <strong><Link style={{ color: 'black' }} to='/profil'>{user.name}</Link></strong></h5>
        <div className="">
          <Link onClick={handleLogout} style={{ color: 'gray' }}>Kijelentkezés</Link>
        </div>
      </div>}
    </div>
  )
}
