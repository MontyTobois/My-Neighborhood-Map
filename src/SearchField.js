import React, {Component} from 'react';

class Search extends Component {

  render() {
    return (
      <div className = 'locationFilter' role= "application">
        <input
          type ='text'
          id = 'queryFilter'
          placeholder = 'Enjoy yourself at these amazing Resorts!'
          aria-label= 'locations filter'
          value = {this.props.query}
          onChange = {event => this.props.updateQuery(event.target.value)}
        />
      </div>);
  }
}

export default Search;
