import React, { memo } from 'react';
import '../css/Footer.css';
import { Link } from 'react-router-dom';

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
