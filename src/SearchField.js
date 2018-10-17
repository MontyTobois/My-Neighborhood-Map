import React, {Component} from 'react';

class SearchField extends Component {

  render() {
    return (
      <div className = 'locationFilter'>
        <input
          type ='text'
          id = 'queryFilter'
          placeholder = 'Food and Drinks Here!'
          value = {this.props.query}
          onChange = {event => this.props.updateQuery(event.target.value)}
        />
      </div>);
  }
}

export default SearchField;
