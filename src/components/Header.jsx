import React, { memo } from 'react';
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';
import '../css/Header.css';

const Header = ()=> {
  return (
    <header id="main-header" className="main-header">
        <div className="container">
            <div className="wrapper">
                <div className="logo-box">
                  <NavLink to="/">
                      <img width="70%" height="5rem" src={logo} alt="logo" className="logo"/>
                  </NavLink>                  
                </div>   
                <div className="current-date">
                  <nav>
                    <NavLink className="about" to="/info">
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
