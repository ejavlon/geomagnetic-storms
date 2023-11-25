import '../css/Header.css';
import React, { memo } from 'react';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import CurrentDate from './CurrentDate';

const Header = ()=> {
  
  const currentDate = ()=>{
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    const formattedDate = `${dd}.${mm.toString().padStart(2, '0')}.${yyyy}`;
    return formattedDate;
  }
  return (
    <header id="main-header" className="main-header">
        <div className="container">
            <div className="wrapper">
                <div className="logo-box">
                  <NavLink to="/">
                      <img src={logo} alt="logo" className="logo"/>
                  </NavLink>                  
                </div>   
                <div className="current-date">
                  {<CurrentDate/>}
                </div>
            </div>
        </div>
    </header>
  )
}

export default memo(Header);
