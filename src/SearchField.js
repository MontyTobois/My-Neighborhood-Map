import React, {Component} from 'react';

class Search extends Component {

  render() {
    return (
      <div className = 'locationFilter' >
        <input
          type ='text'
          id = 'queryFilter'
          autofocus
          placeholder = 'Food and Drinks Here!'
          aria-label= 'locations filter'
          value = {this.props.query}
          onChange = {event => this.props.updateQuery(event.target.value)}
        />
      </div>);
  }
}

export default Search;
