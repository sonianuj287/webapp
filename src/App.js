import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Bar from './components/Bar/Bar';
import Sider from './components/Sider/Sider';
import Backdrop from './components/Backdrop/Backdrop';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Quiz from './components/Quiz/Quiz';


class App extends Component {
  state = {
    siderOpen: false,
  };

  togglerClickHandler = () => {
    this.setState((prev) => {
      return {siderOpen: !prev.siderOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({
      siderOpen: false,
    });
  };

  render(){
    let backdrop;
    if(this.state.siderOpen){
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }
  
    return (
      <Router basename="/react-dummy-nav">
        <div className="App">
          <Bar togglerClickHandler={this.togglerClickHandler}/>
          <Sider show={this.state.siderOpen} togglerClickHandler={this.togglerClickHandler}/>
          {backdrop};
          <main>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={About}/>
              <Route path="/contact" component={Contact}/>
              <Route path='/quiz' component={Quiz}/>
            </Switch>
          </main>
        </div>
      </Router>

    );
  }
}

export default App;

