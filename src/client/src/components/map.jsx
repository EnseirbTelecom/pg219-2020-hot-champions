import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
import Position from '../utils/Position';

export default class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 44.8333,
      lng: -0.5667
    },
    zoom: 11,
    markers:{
    }
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBzU6vrdmdlct27j-d0WHX8GJ1Yx7LByXM' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
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
