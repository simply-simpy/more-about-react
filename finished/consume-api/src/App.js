import React from 'react';
import './App.css';
import PetFinder from "./components/PetFinder";
import fetchJsonp from "fetch-jsonp";



// API Key
// 975b1fe8f29db679023e4bac68f2f3fa
//
// API Secret
// ac623dbd3d77179e3bce73edbf3d3a6d

// api call
const API = 'http://api.petfinder.com/';
const API_KEY = '975b1fe8f29db679023e4bac68f2f3fa';
const DEFAULT_QUERY = 'breed.list';
const ANIMAL = 'dog';
const FORMAT = 'json';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      requestFailed: true
    }
  }
  timeStamp = () => Date.now();

  callAPICallback = () => {
    console.log('click call api callback')
    return fetchJsonp(API + DEFAULT_QUERY + '?key=' + API_KEY + '&animal=' + ANIMAL + '&format=' + FORMAT + '&cb=' + this.timeStamp(), {jsonpCallbackFunction: 'cb'})
        .then((resp) => resp.json())
        .then(resp => {
          let breeds = resp.petfinder.breeds.breed.map(breed => breed.$t);
          this.setState({
            pets: breeds,
            requestFailed: false
          })
        })
        .catch((error) => {
          this.setState({
            requestFailed: true
          });
          console.log('API Error: ', error);
        });
  };
  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h1 className="App-title">How to consume an API in ReactJS</h1>
              <PetFinder callAPI={this.callAPICallback} pets={this.state.pets}/>
            </div>
          </div>
        </div>
    );
  }
}



