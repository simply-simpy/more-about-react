import React from 'react';
import fetchJsonp from 'fetch-jsonp';

// API Key
// 975b1fe8f29db679023e4bac68f2f3fa
//
// API Secret
// ac623dbd3d77179e3bce73edbf3d3a6d

const API = 'http://api.petfinder.com/';
const API_KEY = '975b1fe8f29db679023e4bac68f2f3fa';
const DEFAULT_QUERY = 'breed.list';
const ANIMAL = 'dog';
const FORMAT = 'json';


export default class PetFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      requestFailed: true
    }
  }

  timeStamp = () => Date.now();

  callAPI = () => {
    console.log('click')
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

  // from: https://reactjs.org/docs/lists-and-keys.html#extracting-components-with-keys


  render() {
    let ListItem = (props) => <li>{props.value}</li>;

    let PetList = (props) => {
      const pets = props.pets;
      const listItems = pets.map((pet) =>
          <ListItem key={pet} value={pet}/>
      );

      return (
          <ul>
            {listItems}
          </ul>
      )
    };
    return (
        <div>
          <h1>Petfinder</h1>
          <button onClick={this.callAPI}>Get Data</button>
          {console.log(this.state)}
          <PetList pets={this.state.pets}/>
        </div>
    )
  }
}