import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
function FormHook(props) {
  const [item, setItem] = useState({});
  const handleInputChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(item);
    const emptyItem = {};
    setItem({ item: emptyItem });
  };

  return (
    <>
      <form onSubmit={handleSubmit} class="border p-3">
        <h3>Add Item</h3>
        <Form.Group controlId="newToDoItem">
          <Form.Label>To Do Item</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add To Do List Item "
            name="text"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="Difficulty Rating">
          <Form.Label>Difficulty Rating</Form.Label>
          <Form.Control
            type="range"
            placeholder="Add To Do List Item "
            min="1"
            max="5"
            name="difficulty"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="assignedTo">
          <Form.Label>Assigned To</Form.Label>
          <Form.Control
            type="text"
            placeholder="Assigned To"
            name="text"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" className="align-self-start">
          Add Item
        </Button>
      </form>
    </>
  );
}

export default FormHook;
