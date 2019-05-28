import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GeocodingData from '../../data-services/geocoding'

const style = {
  height: '650px',
  width: '800px'
}


export class Map extends Component {

  constructor(){
    super();
    this.geocodingData = new GeocodingData();
  }
  /**
   *
   */
  componentDidMount() {
    this.loadMap();
  }

  /**
   *
   */
  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;
      const mapRef = this.refs.myMap;
      const mapNode = ReactDOM.findDOMNode(mapRef);

      let zoom = 6;
      let lat = -1.2884;
      let lng = 36.8233;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(mapNode, mapConfig);

      // TODO : this.map.setOption( style )
    }
  }

  /**
   * 
   */
  updateCountry(country) {

    if(this.props.google && this.map != null){
      const maps = this.props.google.maps;

      this.geocodingData.fetchLatLong(country).then((latLong) =>{
        this.map.setCenter(new maps.LatLng(latLong.lat, latLong.long));
      })
      
    }
  }

  /**
   *
   */
  componentDidUpdate(){  
    this.updateCountry(this.props.country);
  }

  /**
   *
   */
  render() {
    return (
      <div ref='myMap' style={style}>
        Loading map...
      </div>
      
    )
  }
}

export default Map;