import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

const  Footer = ()=> {    
  return (
    <footer>
        <div className="container">
            <div className="wrapper">
                <Link to="https://ejavlon.uz" target='_blank' >© {new Date().getFullYear()} ejavlon</Link>
            </div>
        </div>
    </footer>
  )
}
export default memo(Footer);
