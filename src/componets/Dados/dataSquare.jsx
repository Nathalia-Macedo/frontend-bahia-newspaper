// DataSquare.js
import React from 'react';
import { Col } from 'react-bootstrap';
import "./dataSquare.css"
const DataSquare = ({ title, value, buttonText, onClick }) => {
  return (
    <Col md={4} className="mb-3" >
      <div  className="data-square d-flex flex-column justify-content-center align-items-center">
        <div className="text-center">
          <h5  id='font'>{title}</h5>
          <p  id='font'>{value}</p>
        </div>
        <button  id='font' className="btn-admin" onClick={onClick}>{buttonText}</button>
      </div>
    </Col>
  );
};

export default DataSquare;
