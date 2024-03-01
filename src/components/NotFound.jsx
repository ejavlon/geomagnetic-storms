import '../css/NotFound.css';
import React, { memo } from 'react';

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