import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

export default class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 44.8333,
      lng: -0.5667
    },
    zoom: 11,
  };

  state={
    center: {
      lat : this.props.center.lat,
      lng: this.props.center.lng
    },
    zoom: this.props.zoom,
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBzU6vrdmdlct27j-d0WHX8GJ1Yx7LByXM' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
        <Marker
          lat={this.props.center.lat}
          lng={this.props.center.lng}
          name="My Marker"
          color="gray"
        >
        </Marker>
        </GoogleMapReact>
      </div>
    );
  }
}
