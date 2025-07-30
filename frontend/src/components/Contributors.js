import React, { useState } from 'react';
import './Contributors.css';

const Contributors = ({ images }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button onClick={() => setVisible(!visible)} className="toggle-button">
        {visible ? 'Hide About' : 'About the page'}
      </button>

      {visible && (
        <div className="contributors-container visible">
          <h3>Contributors</h3>
          <p>
            This page was created by the following contributors as a summer internship project:
          </p>
          <div className="contributors-grid">
            {images.map((filename) => {
              const name = filename.replace(/\.[^/.]+$/, '');
              return (
                <div className="contributor" key={filename}>
                  <img
                    src={`/${filename}`}
                    alt={name}
                    className="contributor-img"
                  />
                  <div className="contributor-name">{name}</div>
                  <div className="contributor-year">BE CSE 3rd year</div> 
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Contributors;