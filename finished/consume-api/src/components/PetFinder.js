import React from 'react';
import PropTypes from 'prop-types';

export default class PetFinder extends React.Component {

  // from: https://reactjs.org/docs/lists-and-keys.html#extracting-components-with-keys
  render() {
    let ListItem = (props) => <li>{props.value}</li>;

    let PetList = (props) => {
      const pets = props.pets;
      const listItems = pets.map((pet) =>
          <ListItem key={pet} value={pet}/>
      );

      return (
          <ul className='pets'>
            {listItems}
          </ul>
      )
    };
    
    return (
        <div>
          <h1>Petfinder</h1>
          <button onClick={this.props.callAPI}>Show Breeds</button>
          <PetList pets={this.props.pets}/>
        </div>
    )
  }
}

PetFinder.propTypes = {
  pets: PropTypes.array.isRequired,
  callAPI: PropTypes.func.isRequired,
};