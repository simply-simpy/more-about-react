import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PetFinder from "./components/PetFinder";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">How to consume an API in ReactJS</h1>
        </header>
        <PetFinder/>
      </div>
    );
  }
}

export default App;
