import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import TodoForm from './form.js';
import TodoList from './list.js';

function TodoHooks() {
  // create list state
  const [list, setLIst] = useState([]);
  const addItem = item => {
    item._id = uuidv4();
    item.complete = false;
    setLIst([...list, item]);
  };
  const toggleComplete = id => {
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      setLIst(list.map(listItem => (listItem._id === item._id ? item : listItem)));
    }
  };
  useEffect(() => {
    setLIst([
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A' },
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B' },
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B' },
    ]);
  }, []);
  return (
    <>
      <header>
        <Container className="mb-3">
          <Navbar bg="info">
            <Navbar.Brand href="#home">Brand link</Navbar.Brand>
          </Navbar>
        </Container>
        <Container>
          <Row>
            <Col>
              <h2 className="text-white bg-dark">
                There are {list.filter(item => !item.complete).length} Items To Complete
              </h2>
            </Col>
          </Row>
        </Container>
      </header>

      <section className="todo">
        <Container>
          <Row>
            <Col>
              <TodoForm handleSubmit={addItem} />
            </Col>
            <Col>
              <TodoList list={list} handleComplete={toggleComplete} />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default TodoHooks;
