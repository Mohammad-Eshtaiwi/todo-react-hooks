import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import cookie from 'react-cookies';
dotenv.config();
const API = process.env.API_SERVER || 'https://auth-server-401.herokuapp.com';
const SECRET = process.env.JWT_SECRET || 'supersecret';
export const LoginContext = React.createContext();

function LoginProvider(props) {
  let [loggedIn, setLogin] = useState(false);
  let [user, setUser] = useState(false);
  let [capabilities, setCapabilities] = useState([]);
  // capabilities
  let state = { loggedIn, login, logout, user, setUser, capabilities, setCapabilities };
  function setLoginState(loggedIn, token, user) {
    console.log(user);
    cookie.save('auth', token);
    setLogin(loggedIn);
    setUser(user);
    setCapabilities(loggedIn ? user.capabilities : []);
  }
  //   didMount
  useEffect(() => {
    const token = cookie.load('auth');
    validateToken(token);
  }, []);
  function validateToken(token) {
    try {
      const user = jwt.verify(token, SECRET);
      // const user = jwt.decode(token);
      console.log('hi', user);
      setLoginState(true, token, user);
    } catch (e) {
      console.log(`TOKEN validation ERROR ${e.message}`);
      console.log(user);
      setLoginState(false, null, false);
    }
  }
  async function login(username, password) {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set('authorization', `Basic ${btoa(`${username}:${password}`)}`);
      console.log('body', response.body);
      validateToken(response.body.token);
    } catch (e) {
      console.error(e.message);
    }
  }
  function logout() {
    setLoginState(false, null, {}, []);
  }

  return <LoginContext.Provider value={state}>{props.children}</LoginContext.Provider>;
}

export default LoginProvider;
