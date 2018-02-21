import React from 'react';
import './App.css';
import PetFinder from "./components/PetFinder";
import fetchJsonp from "fetch-jsonp";
import SearchForPet from "./components/SearchForPet";



// API Key
// 975b1fe8f29db679023e4bac68f2f3fa
//
// API Secret
// ac623dbd3d77179e3bce73edbf3d3a6d

// api call
const API = 'http://api.petfinder.com/pet.find';
const API_KEY = '975b1fe8f29db679023e4bac68f2f3fa';
const DEFAULT_QUERY = 'breed.list';
const ANIMAL = 'dog';
const OUTPUT = 'basic';
const FORMAT = 'json';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      requestFailed: true,
      zip: "",
      age: "",
      size: "",
      sex: ""
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
  zipHandleChangeCallback = (event) => {
    this.setState({zip: event.target.value});
  };
  ageHandleChangeCallback = (event) => {
    this.setState({age: event.target.value});
  };
  sizeHandleChangeCallback = (event) => {
    this.setState({size: event.target.value});
  };
  sexHandleChangeCallback = (event) => {
    this.setState({sex: event.target.value});
  };

  submitSearchCallback = (event) => {
    event.preventDefault();
    console.log(`search for pet url:
        ${API}?key=${API_KEY}&animal=${ANIMAL}&location=${this.state.zip}&sex=${this.state.sex}&size=${this.state.size}&output=${OUTPUT}&format=${FORMAT}&cb=${this.timeStamp()}
    `
    )
  };

  render() {
    console.log('zip change: ', this.state.zip);
    console.log('dog age: ', this.state.age);
    console.log('dog size: ', this.state.size);
    console.log('dog sex: ', this.state.sex);
    {console.log(API + DEFAULT_QUERY + '?key=' + API_KEY + '&animal=' + ANIMAL + '&format=' + FORMAT + '&cb=' + this.timeStamp(), {jsonpCallbackFunction: 'cb'})}
    return (
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h1 className="App-title">How to consume an API in ReactJS</h1>
              <PetFinder callAPI={this.callAPICallback} pets={this.state.pets}/>
              <SearchForPet
                  submitSearchCallback={this.submitSearchCallback}
                  zipHandleChangeCallback={this.zipHandleChangeCallback}
                  ageHandleChangeCallback={this.ageHandleChangeCallback}
                  sizeHandleChangeCallback={this.sizeHandleChangeCallback}
                  sexHandleChangeCallback={this.sexHandleChangeCallback}
                  callAPI={this.searchForPetCallback}
                  pets={this.state.pets}/>
            </div>
          </div>
        </div>
    );
  }
}



