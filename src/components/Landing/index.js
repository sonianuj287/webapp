import React from 'react';
import logo from './logo.png';
import background from "./img6.jpeg";

const Landing = () => (
  <div className="App" style={{ backgroundImage: `url(${background})` ,height:800,width:1700 }}>
  <img src={logo} style={{alignSelf:'center'}} alt="logo"/>
   <h1>Learn and Grow</h1>
  </div>
);

export default Landing;
