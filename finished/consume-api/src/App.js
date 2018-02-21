import React, {Component} from 'react';
import './App.css';
import PetFinder from "./components/PetFinder";


class App extends Component {
  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h1 className="App-title">How to consume an API in ReactJS</h1>
              <PetFinder/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
