import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import useForm from './hooks/useForm';
function FormHook(props) {
  const [values, handleInputChange, handleSubmit] = useForm(handleSubmitToHook);
  console.log(props);
  const [item, setItem] = useState({});
  // const handleInputChange = e => {
  //   setItem({ ...item, [e.target.name]: e.target.value });
  // };
  function handleSubmitToHook(e) {
    e.preventDefault();
    console.log(e);
    e.target.reset();
    props.handleSubmit(values);
    const emptyItem = {};
    setItem({ item: emptyItem });
  }

  return (
    <>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
        className="border p-3"
      >
        <h3>Add Item</h3>
        <Form.Group controlId="newToDoItem">
          <Form.Label>To Do Item</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add To Do List Item "
            name="text"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="Difficulty Rating">
          <Form.Label>Difficulty Rating</Form.Label>
          <Form.Control
            type="range"
            placeholder="Add To Do List Item "
            defaultValue="3"
            min="1"
            max="5"
            name="difficulty"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="assignedTo">
          <Form.Label>Assigned To</Form.Label>
          <Form.Control
            type="text"
            placeholder="Assigned To"
            name="assignee"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" className="align-self-start" type="submit">
          Add Item
        </Button>
      </form>
    </>
  );
}

export default FormHook;
