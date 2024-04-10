import React from 'react';
import { Form } from 'react-bootstrap';

const LargeInput = () => {
  return (
    <Form.Group className="text-center">
      <Form.Control
        as="textarea"
        rows={1}
        style={{ maxWidth: '700px', margin: '0 auto' }}
        placeholder="O que esta procurando? "
      />
    </Form.Group>
  );
};

export default LargeInput;
