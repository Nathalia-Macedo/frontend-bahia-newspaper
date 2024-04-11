// DataSquare.js
import React from 'react';
import { Col } from 'react-bootstrap';
import "./dataSquare.css"
const DataSquare = ({ title, value, buttonText, onClick }) => {
  return (
    <Col md={4} className="mb-3">
      <div className="data-square d-flex flex-column justify-content-center align-items-center">
        <div className="text-center">
          <h5>{title}</h5>
          <p>{value}</p>
        </div>
        <button className="btn-admin" onClick={onClick}>{buttonText}</button>
      </div>
    </Col>
  );
};

export default DataSquare;
