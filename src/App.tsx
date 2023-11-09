import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/App.css';
import SignIn from './pages/SignIn';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SignIn/>
  </React.StrictMode>,
);
