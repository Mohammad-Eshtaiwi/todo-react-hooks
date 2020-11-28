import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { If, Else, Then } from 'react-if';
import { Container, Row, Col, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { LoginContext } from '../../context/auth';
import TodoForm from './form.js';
import TodoList from './list.js';
import Settings from './settings';
import useForm from './hooks/useForm';
const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';
function TodoHooks() {
  // create list state
  const value = useContext(LoginContext);
  console.log(value);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [values, handleInputChange, handleSubmit] = useForm(handleLogin);
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
  useEffect(() => {
    getTodoItems();
    if (!value.loggedIn) value.setUser(false);
  }, []);
  function handleLogin(e) {
    e.preventDefault();
    console.log(e);
    e.target.reset();
    let { username, password } = values;
    setUsername(username);
    setPassword(password);
    value.login(username, password);
  }
  return (
    <>
      <header>
        <Container className="mb-3" fluid>
          <Navbar bg="info" className="d-flex justify-content-between">
            <Navbar.Brand href="#home">ToDo List</Navbar.Brand>
            <If condition={!value.loggedIn}>
              <Then>
                <Form
                  inline
                  onSubmit={e => {
                    console.log('hi');
                    handleSubmit(e);
                  }}
                >
                  <FormControl
                    type="text"
                    placeholder="username"
                    className="mr-sm-2"
                    name="username"
                    onChange={e => {
                      handleInputChange(e);
                    }}
                  />
                  <FormControl
                    type="text"
                    placeholder="password"
                    className="mr-sm-2"
                    name="password"
                    onChange={e => {
                      handleInputChange(e);
                    }}
                  />
                  <Button variant="outline-light" type="submit">
                    login
                  </Button>
                </Form>
              </Then>
              <Else>
                <Button variant="outline-light" onClick={value.logout}>
                  logout
                </Button>
              </Else>
            </If>
          </Navbar>
        </Container>
        <Container></Container>
      </header>

      <If condition={value.user}>
        <Then>
          <section className="todo">
            <Container>
              <h2 className="text-white bg-dark">
                There are {list.filter(item => !item.complete).length} Items To Complete
              </h2>
              <Row>
                {console.log(value.capabilities)}
                <If condition={value.capabilities.includes('create')}>
                  <Col>
                    <TodoForm handleSubmit={addItem} />
                  </Col>
                </If>
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
        </Then>
      </If>
    </>
  );
}
export default TodoHooks;
