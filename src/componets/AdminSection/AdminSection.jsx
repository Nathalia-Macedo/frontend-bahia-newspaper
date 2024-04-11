// AdminSession.js
import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import DataSquare from '../Dados/dataSquare';

const AdminSession = () => {
  const [numberOfEmployees, setNumberOfEmployees] = useState(0);

  const fetchEmployeeData = () => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://34.125.197.110:3333/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        return response.json();
      })
      .then(data => {
        setNumberOfEmployees(data.length);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
    }
  };

  useEffect(() => {
    fetchEmployeeData();
    const intervalId = setInterval(fetchEmployeeData, 300000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <DataSquare 
          title="Quantidade de Funcionários" 
          value={numberOfEmployees} 
          buttonText="Ver Detalhes" 
          onClick={fetchEmployeeData}
        />
        {/* Renderize mais DataSquares conforme necessário */}
      </Row>
    </Container>
  );
};

export default AdminSession;
