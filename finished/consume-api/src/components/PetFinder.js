import React from 'react';
import fetchJsonp from 'fetch-jsonp';

// API Key
// 975b1fe8f29db679023e4bac68f2f3fa
//
// API Secret
// ac623dbd3d77179e3bce73edbf3d3a6d
// http://api.petfinder.com/my.method?key=12345&arg1=foo
// http://api.petfinder.com/breed.list?format=json&key=975b1fe8f29db679023e4bac68f2f3fa
// http://api.petfinder.com?key=975b1fe8f29db679023e4bac68f2f3fa&breed.list
// http://api.petfinder.com/my.method?format=json&key=12345&callback=?
// http://api.petfinder.com/breed.list?key=975b1fe8f29db679023e4bac68f2f3fa&animal="dog"
// http://api.petfinder.com/breed.list?key=975b1fe8f29db679023e4bac68f2f3fa&animal=dog&format=json
// http://api.petfinder.com/?key=975b1fe8f29db679023e4bac68f2f3fa?key=breed.list&animal=dog
// http://api.petfinder.com/?key=975b1fe8f29db679023e4bac68f2f3fabreed.list&animal=dog
// http://api.petfinder.com/breed.list&animal=dog?key=975b1fe8f29db679023e4bac68f2f3fabreed.list&animal=dog
// http://api.petfinder.com/breed.list?key=975b1fe8f29db679023e4bac68f2f3fa&animal=dogformat=&json&callback=1222212323231451
// http://api.petfinder.com/breed.list?key=975b1fe8f29db679023e4bac68f2f3fa&animal=dog&format=json&callback=1222212323231451
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
    }
  }

  timeStamp = () => Date.now();

  componentDidMount() {
    fetchJsonp(API + DEFAULT_QUERY + '?key=' + API_KEY + '&animal=' + ANIMAL + '&format=' + FORMAT + '&cb=' + this.timeStamp(), {
      jsonpCallbackFunction: 'cb'
    })
        .then(response => response.json())
        .then(data => console.log(data) )
        .then(data => console.log(data) )
        // .then(data => data.map(function(item){
        //   console.log(item)
        // }))
        //.then(data => this.setState({ pets: data.petfinder.breeds.breed })

    .catch(function (ex) {
      console.log('parsing failed', ex)
    })
  }

  render() {
    return (
        <div>
          <h1>Petfinder</h1>
          {this.state.pets}
        </div>
    )
  }
}