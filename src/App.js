import React, {Component} from 'react';
import './App.css';
import VenueMenu from './VenueMenu';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      query: '',
      invisibleMarkers: [],
      showVenues:[]
    };
  }

  componentDidMount() {
    // eslint-disable-next-line //
    this.getVenues()
  }

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCt-wcz37sl15ti-UayWIezrLp30d46YY8&callback=initMap')
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    const parameters = {
      client_id: 'HDWHBLKEKEJNYTSHBPANCM3FNFL0GXGDVXO3TFBZKJJYV24V',
      client_secret: 'W2ADHU5C0LFN20QPE2CHAXC2K03O4WW2SPASYEXSTVWWDMTC',
      query: 'food',
      near: 'Ocho Rios',
      v: '20180323',
      limit: 10,
    }
    axios.get(endPoint + new URLSearchParams(parameters)).then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
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

    const infoWindow = new window.google.maps.InfoWindow();
    // eslint-disable-next-line
    this.state.venues.map(myVenue => {

      const contentString = `${myVenue.venue.name} <br> ${myVenue.venue.location.address}`
      // creates markers
      const marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat,
          lng: myVenue.venue.location.lng
        },
        map: map,
        animation: window.google.maps.Animation.DROP,
        title: myVenue.venue.name
      });
  //creates the toggling effect on markers
      function toggleBounce() {
          marker.setAnimation(window.google.maps.Animation.BOUNCE)
          setTimeout(function () { marker.setAnimation(null)
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

  render() {
    return (<main className='app'>
      <div id="map" ></div>
    <div>
      <VenueMenu
      venues={this.state.venues}
      markers ={this.state.markers}
    />
    </div>
    </main>);
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
