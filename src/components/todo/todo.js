import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';

import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { SettingsContext } from '../../context/settings';
import TodoForm from './form.js';
import TodoList from './list.js';
import Settings from './settings';
const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';
function TodoHooks() {
  // create list state
  const value = useContext(SettingsContext);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = item => {
    console.log(item);
    item.due = new Date();
    console.log(item);
    axios({
      url: todoAPI,
      method: 'post',
      data: item,
    })
      .then(response => {
        console.log(response);
        setList([...list, response.data]);
      })
      .catch(console.error);
  };
  function sortList(list) {
    return list.sort(function (a, b) {
      console.log('sorting');
      if (value.sort === 'text') {
        var nameA = a[value.sort].toUpperCase(); // ignore upper and lowercase
        var nameB = b[value.sort].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }
      if (value.sort === 'difficulty') {
        return a[value.sort] - b[value.sort];
      }
    });
  }
  const toggleComplete = id => {
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;
      console.log(url);
      axios
        .put(url, item, { cache: 'no-cache' })
        .then(response => {
          console.log(response);
          const savedItem = response.data;
          setList(list.map(listItem => (listItem._id === item._id ? savedItem : listItem)));
        })
        .catch(console.error);
    }
  };
  const deleteItem = item => {
    let realItem = JSON.parse(item);
    const newList = list.filter(listItem => realItem._id !== listItem._id);
    setList(newList);
    console.log(realItem._id);

    axios
      .delete(todoAPI + '/' + realItem._id)
      .then(response => {
        console.log(response);
      })
      .catch(console.error);
  };

  const getTodoItems = () => {
    axios.get(todoAPI).then(response => {
      setIsLoading(false);
      // setList(sortList(response.data.results));
      setList(response.data.results);
    });
  };
  useEffect(getTodoItems, []);
  // useEffect(() => {
  //   console.log(value.sort);
  //   sortList(list);
  //   console.log(list);
  // }, [value.sort]);
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
              <Settings />
              {isLoading ? (
                <img
                  src="https://media0.giphy.com/media/2WjpfxAI5MvC9Nl8U7/200_d.gif"
                  alt="loading"
                />
              ) : (
                <TodoList list={list} toggleComplete={toggleComplete} deleteItem={deleteItem} />
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
export default TodoHooks;
