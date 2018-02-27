import React from 'react';
import './App.css';
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
const ANIMAL = 'dog';
const OUTPUT = 'basic';
const FORMAT = 'json';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      dogs: [],
      requestFailed: true,
      zip: "",
      age: "",
      size: "",
      sex: ""
    }
  }

  timeStamp = () => Date.now();

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
    return fetchJsonp(`${API}?key=${API_KEY}&animal=${ANIMAL}&location=${this.state.zip}&sex=${this.state.sex}&age=${this.state.age}&size=${this.state.size}&output=${OUTPUT}&format=${FORMAT}&cb=${this.timeStamp()}`)
        .then((resp) => resp.json())
        .then(resp => {
          let dogs = resp.petfinder.pets.pet.map(function (dog) {
            return dog;
          });
          this.setState({
            dogs: dogs
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
        <SearchForPet
            submitSearchCallback={this.submitSearchCallback}
            zipHandleChangeCallback={this.zipHandleChangeCallback}
            ageHandleChangeCallback={this.ageHandleChangeCallback}
            sizeHandleChangeCallback={this.sizeHandleChangeCallback}
            sexHandleChangeCallback={this.sexHandleChangeCallback}
            dogs={this.state.dogs}
            error={this.state.requestFailed}
        />
    );
  }
}



