import React, { useState, useEffect } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import './todo.scss';
const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';
function todoConnectedHooks() {
  const [list, setList] = useState([]);

  const addItem = item => {
    item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem]);
      })
      .catch(console.error);
  };
  const addItem = item => {
    item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem]);
      })
      .catch(console.error);
  };

  const toggleComplete = id => {
    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => (listItem._id === item._id ? savedItem : listItem)));
        })
        .catch(console.error);
    }
  };

  return <div></div>;
}
useEffect(getTodoItems, []);

export default todoConnectedHooks;
