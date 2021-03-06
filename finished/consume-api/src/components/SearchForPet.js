import React from 'react';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';


export default class SearchForPet extends React.Component {

  setSize(size) {
    switch (size) {
      case "S":
        size = "Small";
        break;
      case "M":
        size = "Medium";
        break;
      case "L":
        size = "Large";
        break;
      case "XL":
        size = "Extra-large";
        break;
      default:
        size = "Not Available"
    }
    return size;
  }

  render() {
    let dogs = this.props.dogs.map((dog, index) =>
        <li key={index}>
          <div className="pet">
            {dog.media.photos !== undefined ? (
                <img src={dog.media.photos.photo[2].$t} alt=""/>
            ) : (false)}
            <h3>{dog.name.$t}</h3>
            <div className="description">
              <Truncate lines={5} ellipsis={<span>... <a href='/link/to/article'>Read more</a></span>}>
                {dog.description.$t}
              </Truncate>
            </div>
            <div className="sex"><strong>Sex:</strong> {dog.sex.$t === "M" ? "Male" : "Female"}</div>
            <div className="age"><strong>Age:</strong> {dog.age.$t}</div>
            <div className="size"><strong>Size:</strong> {this.setSize(dog.size.$t)}</div>
            {dog.contact.email.$t ? (
                <div className="email"><strong>Email:</strong> <a
                    href={dog.contact.email.$t}>{dog.contact.email.$t}</a>
                </div>
            ) : (false)}
            {dog.contact.phone.$t ? (
                <div className="phone"><strong>Phone:</strong> {dog.contact.phone.$t}</div>
            ) : (false)}
          </div>
        </li>
    );


    let DogList = () => {
      return (
          <div className="dog-list">
            <h2>Your dogs</h2>
            <div className="dog-list-wrap">
              <ul>
                {dogs}
              </ul>
            </div>
          </div>
      )
    };

    return (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <h2>Find an adoptable dog</h2>
                <form onSubmit={this.props.submitSearchCallback}>
                  <div className="form-group">
                    <label htmlFor="zip">ZIP code where you are looking for a dog <span>*</span></label>
                    <input onChange={this.props.zipHandleChangeCallback}
                           type="zip"
                           className="form-control"
                           id="zip"
                           aria-describedby="emailHelp"
                           placeholder="Please enter 5 digit ZIP"
                           pattern="[0-9]{5}"
                           maxLength="5"
                           required/>
                  </div>

                  <select
                      onChange={this.props.ageHandleChangeCallback}
                      className="form-control"
                      defaultValue='age'
                      id="age">
                    <option value="age">Dog Age</option>
                    <option value="Baby">Baby</option>
                    <option value="Young">Young</option>
                    <option value="Adult">Adult</option>
                    <option value="Senior">Senior</option>
                  </select>

                  <select onChange={this.props.sizeHandleChangeCallback}
                          className="form-control"
                          defaultValue="size">
                    <option value="size">Dog Size</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="XL">Extra-large</option>
                  </select>

                  <div className="form-check">
                    <input onChange={this.props.sexHandleChangeCallback}
                           className="form-check-input"
                           type="radio"
                           name="sex"
                           id="radio-female"
                           value="F"/>
                    <label className="form-check-label"
                           htmlFor="radio-female">
                      Female
                    </label>
                  </div>
                  <div className="form-check">
                    <input onChange={this.props.sexHandleChangeCallback}
                           className="form-check-input"
                           type="radio"
                           name="sex"
                           id="radio-male" value="M"/>
                    <label className="form-check-label" htmlFor="radio-male">
                      Male
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">Find your pooch!</button>
                </form>
              </div>
            </div>
          </div>

          {this.props.dogs.length > 0 ? (
              <DogList/>
          ) : (false)}
        </div>
    )
  }
}

SearchForPet.propTypes = {
  dogs: PropTypes.array.isRequired,
  submitSearchCallback: PropTypes.func.isRequired,
  zipHandleChangeCallback: PropTypes.func.isRequired,
  ageHandleChangeCallback: PropTypes.func.isRequired,
  sizeHandleChangeCallback: PropTypes.func.isRequired,
  sexHandleChangeCallback: PropTypes.func.isRequired
};