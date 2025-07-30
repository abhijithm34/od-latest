import React from "react";
import "./Contributors.css";

const Contributors = ({ images }) => {
  return (
    <div className="contributors-container visible">
      <h3>CONTRIBUTORS</h3>
      <p>
        This Student OD Application was created by the following contributors as a summer
        internship project:
      </p>
      <div className="contributors-grid">
        {images.map((filename) => {
          const name = filename.replace(/\.[^/.]+$/, "");
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
  );
};

export default Contributors;
