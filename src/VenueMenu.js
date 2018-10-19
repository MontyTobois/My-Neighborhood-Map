import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu';

class VenueMenu extends Component {



render () {
    return (
      <Menu width={'25%'}>
        <div className = "listOfVenues">
        {this.props.venues.map(myVenue => (
          <li role = "menuitem"
            onClick={() => {
              this.openMarker(myVenue.venue.name)
            }}
            id = {myVenue.venue.id}
            key = {myVenue.venue.id}
          >

            <br/>
            <b>{myVenue.venue.name}</b>
            <br/>
            <i>{myVenue.venue.location.address}</i>
            </li>
        ))}

        </div>

      </Menu>
    );
  }
}


export default VenueMenu;
