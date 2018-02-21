import React from 'react';
import PropTypes from 'prop-types';
// show breeds:
// http://api.petfinder.com/breed.list?key=975b1fe8f29db679023e4bac68f2f3fa&animal=dog&format=json&cb=1519248465835
// with zip:
// http://api.petfinder.com/pet.getRandom&key=975b1fe8f29db679023e4bac68f2f3fa&location=97209&animal=dog&format=json&cb=1519248465835
// http://api.petfinder.com/pet.getRandom?key=975b1fe8f29db679023e4bac68f2f3fa&animal=dog&location=97209&output=basic&format=json&callback=123456
// http://api.petfinder.com/pet.find?key=975b1fe8f29db679023e4bac68f2f3fa&animal=dog&location=97209&output=basic&format=json&callback=123456

// Build this:
//http://api.petfinder.com/pet.find?key=975b1fe8f29db679023e4bac68f2f3fa&animal=dog&location=97209&sex=M&age=Adult&output=basic&format=json&callback=123456

export default class SearchForPet extends React.Component {

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
          <h2>Find an adoptable dog</h2>
          <form onSubmit={this.props.submitSearchCallback}>
            <div className="form-group">
              <label htmlFor="zip">ZIP code where you are looking for a dog</label>
              <input onChange={this.props.zipHandleChangeCallback} type="zip" className="form-control" id="zip" aria-describedby="emailHelp"
                     placeholder="Please enter 5 digit ZIP" pattern="[0-9]{5}" maxLength="5"/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.
              </small>
            </div>

            <select onChange={this.props.ageHandleChangeCallback} className="form-control" defaultValue='age' id="age">
              <option value="age">Dog Age</option>
              <option value="baby">Baby</option>
              <option value="young">Young</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>

            <select onChange={this.props.sizeHandleChangeCallback} className="form-control" defaultValue="size">
              <option value="size">Dog Size</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra-large</option>
            </select>


            <div className="form-check">
              <input onChange={this.props.sexHandleChangeCallback} className="form-check-input" type="radio" name="sex" id="radio-female" value="F"/>
                <label className="form-check-label" htmlFor="radio-female">
                  Female
                </label>
            </div>
            <div className="form-check">
              <input onChange={this.props.sexHandleChangeCallback} className="form-check-input" type="radio" name="sex" id="radio-male" value="M" />
                <label className="form-check-label" htmlFor="radio-male">
                  Male
                </label>
            </div>
            
            
            <button type="submit" className="btn btn-primary">Find your pooch!</button>
          </form>
          <button onClick={this.props.callAPI}>Show Breeds</button>
          <PetList pets={this.props.pets}/>
        </div>
    )
  }
}

SearchForPet.propTypes = {
  pets: PropTypes.array.isRequired,
  submitSearchCallback: PropTypes.func.isRequired,
  zipHandleChangeCallback: PropTypes.func.isRequired,
  ageHandleChangeCallback: PropTypes.func.isRequired,
  sizeHandleChangeCallback: PropTypes.func.isRequired,
  sexHandleChangeCallback: PropTypes.func.isRequired
};