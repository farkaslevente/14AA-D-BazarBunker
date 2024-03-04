import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/bunker.png'

export const Navbar = () => {
    const [menu, setMenu] = useState("hirdetes")

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" className='nav-img-size'/>
        <p>BAZARBUNKER</p>
      </div>
      <ul className='nav-menu'> 
        <li onClick={()=>{setMenu("hirdetesek")}}>Hirdetések{menu==="hirdetesek"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("ujhirdetes")}}>Új hirdetés{menu==="ujhirdetes"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login">
        <button>Bejelentkezés</button>
      </div>
    </div>
  )
}
