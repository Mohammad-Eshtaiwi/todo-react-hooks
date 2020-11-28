import 'bootstrap/dist/css/bootstrap.min.css';
import './todo.scss';
import ToDo from './components/todo/todo';
import SettingsProvider from './context/settings';
import LoginProvider from './context/auth';
import React from 'react';

export default function App() {
  return (
    <LoginProvider>
      <SettingsProvider>
        <ToDo />
      </SettingsProvider>
    </LoginProvider>
  );
}
