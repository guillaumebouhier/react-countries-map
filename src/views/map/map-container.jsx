import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './map';

export class MapContainer extends Component {

  /**
   *
   */
  render() {

    return (
      <div>
        <Map 
          google= {this.props.google}
          country= {this.props.country}
          />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY_MAP
})(MapContainer);