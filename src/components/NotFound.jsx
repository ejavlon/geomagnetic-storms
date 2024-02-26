import React, { memo } from 'react';
import '../css/NotFound.css';

export const NotFound = memo(() => {
  return (
    <section className="notfound">
        <div className="container">
            <div className="box">
                <h1>Page Not Found</h1>
            </div>
        </div>
    </section>
  )
});