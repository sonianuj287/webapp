import React from 'react';
import '../../App.css';
import Login from '../Login';
import Logout from '../Logout';
import logo from '../../logo.png';

const Home = () => {
  return (
    <div className="App">
     <img src={logo} className="App-logo" alt="logo" />
      <h1>Learn and Grow</h1>
      <Login />
      <br />
      <Logout />
      <br />
</div>
  );
};

export default Home;
