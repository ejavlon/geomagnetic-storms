import '../css/Header.css';
import React, { memo } from 'react';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';

const Header = ()=> {
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
                  <nav>
                    <NavLink className="about" to="/about">
                        Маълумот
                    </NavLink>  
                  </nav>
                </div>
            </div>
        </div>
    </header>
  )
}

export default memo(Header);
