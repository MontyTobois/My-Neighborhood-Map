import React, {Component} from 'react';
import './App.css';
import VenueMenu from './VenueMenu';
import axios from 'axios';
import ErrorBoundary from './ErrorBoundary'
import SearchField from './SearchField';
import escapeRegExp from 'escape-string-regexp';
import Banner from './Banner'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      venues: [],
      markers: [],
      query: '',
      invisibleMarkers: [],
      showVenues: []
    };
  }

  //calls the info from axios one time
  componentDidMount() {
    // eslint-disable-next-line
    this.getVenues()
  }

//Brings the map to life with api key, will need to use your own
  renderMap = () => {
    loadScript('xxxxxxxx')
    window.initMap = this.initMap
  }

//get venues data from foursquare api using axios
//based on jamaica locations
  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id: 'HDWHBLKEKEJNYTSHBPANCM3FNFL0GXGDVXO3TFBZKJJYV24V',
      client_secret: 'W2ADHU5C0LFN20QPE2CHAXC2K03O4WW2SPASYEXSTVWWDMTC',
      query: 'resort',
      near: 'Ocho Rios',
      v: '20180323',
      limit: 7
    }

    /*Like the FETCH API - using axios for the same goal.
    Placed this.renderMap() here instead of componentDidMount(),
    since the call is asynchronous, map won't get markers unless this.renderMap()
    is called after the repsonse */
    axios.get(endPoint + new URLSearchParams(parameters)).then(response => {
      this.setState({
        venues: response.data.response.groups[0].items,
        showVenues: response.data.response.groups[0].items
      }, this.renderMap())
    }).catch(error => {
      console.log('ERROR' + error);
    })
  }

  //creates the map
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 18.405682,
        lng: -77.096733
      },
      zoom: 14
    });

   //creats the infowindow for the marker that is selected
    const infoWindow = new window.google.maps.InfoWindow();
    // eslint-disable-next-line
    this.state.venues.map(myVenue => {

   //grabs the name and location
    const contentString = `${myVenue.venue.name} <br/> ${myVenue.venue.location.address}`

      // creates markers
    const marker = new window.google.maps.Marker({
      position: {
        lat: myVenue.venue.location.lat,
        lng: myVenue.venue.location.lng
      },
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: myVenue.venue.name,
      })
        this.state.markers.push(marker)

      //creates the bounce effect on the markers
      function toggleBounce() {
        marker.setAnimation(window.google.maps.Animation.BOUNCE)
        setTimeout(function() {
          marker.setAnimation(null)
        }, 1000);
      }

      //click event for marker set for 1 second (two bounces)
      marker.addListener('click', function() {
        infoWindow.setContent(contentString);
        toggleBounce();
        infoWindow.open(map, marker);
        console.log(contentString);
      });
    })
  }

 /*Based on the search you enter a marker(s) will render to the map and
  those that don't fit the criteria will be removed*/
  updateQuery = query => {
    this.setState({query})
    this.state.markers.map(marker => marker.setVisible(true))
    let filterVenues
    let invisibleMarkers

    if (query) {
      const pairUp = new RegExp(escapeRegExp(query), "i")
      filterVenues = this.state.venues.filter(myVenue =>
        pairUp.test(myVenue.venue.name)
      )
      this.setState({venues: filterVenues})
      invisibleMarkers = this.state.markers.filter(marker =>
        filterVenues.every(myVenue => myVenue.venue.name !== marker.title)
      )
      /*
       * Hiding the markers for venues not included in the filtered venues
      */
      invisibleMarkers.forEach(marker => marker.setVisible(false))

      this.setState({invisibleMarkers})
    } else {
      this.setState({venues: this.state.showVenues})
      this.state.markers.forEach(marker => marker.setVisible(true))
    }
  }

  render() {
    if (this.state.hasError) {
      return <div id ='error-message' aria-label= 'Error message'>Sorry, something went wrong!</div>
    }else{
      return (
        <main className='app' >
        <ErrorBoundary>
          <div aria-label='Banner'>
            <Banner/ >
          </div>
          <SearchField aria-label='Search Bar'
          venues={this.state.venues}
          markers={this.state.markers}
          filterdVenues={this.filterdVenues}
          query={this.state.query}
          clearQuery={this.clearQuery}
          updateQuery={e => this.updateQuery(e)}
          clickLocation={this.clickLocation}
        // eslint-disable-next-line
        aria-label = 'SearchField'
          />

          <VenueMenu aria-label='Mene Container'
          venues={this.state.venues}
          markers={this.state.markers}
        // eslint-disable-next-line
        aria-label = 'VenueMenu'
          />
          <div id="map" aria-label='Map' role='application'></div>
          </ErrorBoundary>
    </main>);
    }
  }
}


function loadScript(url) {
  const index = window.document.getElementsByTagName('script')[0]
  const script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}



export default App;
