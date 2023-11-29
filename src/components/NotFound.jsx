import React, { memo } from 'react';
import '../css/NotFound.css';

const NotFound = ()=> {
  return (
    <section className="notfound">
        <div className="container">
            <div className="box">
                <h1>Page Not Found</h1>
            </div>
        </div>
    </section>
  )
}
export default memo(NotFound);
