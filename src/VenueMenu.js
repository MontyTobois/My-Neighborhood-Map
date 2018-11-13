import React, {Component} from 'react';
import { slide as Menu } from 'react-burger-menu';

class VenueMenu extends Component {

//If you click on a venue within the menu the corresponding marker will present itself//
openMarker = locationName => {
    // eslint-disable-next-line
  this.props.markers.map(marker => {
    if(marker.title === locationName){
      window.google.maps.event.trigger(marker, "click")
    }
  })
}


render () {
    return (
      <Menu width={'25%'} isOpen noOverlay>
        <div className = "listOfVenues" aria-label='List of Venues'>
        {this.props.venues.map(myVenue => (
          <li role = "menuitem"
            onClick={() => {
            this.openMarker(myVenue.venue.name)
            }}
            aria-label={myVenue.venue.name}
            tabIndex = "0"
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
