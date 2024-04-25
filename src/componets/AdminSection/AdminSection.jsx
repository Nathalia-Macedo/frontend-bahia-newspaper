import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import DataSquare from '../Dados/dataSquare';
import './AdminSection.css'

const AdminSession = ({ dataSquares }) => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedValues = await Promise.all(
          dataSquares.map(async (square) => {
            const response = await fetch(square.endpoint, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });

            if (!response.ok) {
              throw new Error(`Failed to fetch data for ${square.title}`);
            }

            const data = await response.json();
            return data.length;
          })
        );

        setValues(updatedValues);
      } catch (error) {
        console.error('Error fetching data squares:', error);
      }
    };

    fetchData();
  }, [dataSquares]);

  return (
    <div className="my-5 container_section_admin">
      <Row className="line">
        {dataSquares.map((square, index) => (
          <DataSquare
            key={index}
            title={square.title}
            value={values[index]}
            buttonText={square.buttonText}
            onClick={square.onClick}
          />
        ))}
      </Row>
    </div>
  );
};

export default AdminSession;
