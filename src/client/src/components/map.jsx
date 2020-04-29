import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import getPosition from '../utils/GetPosition';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 44.8333,
      lng: -0.5667
    },
    zoom: 11
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
          lat={44.8333}
          lng={-0.5667}
          name="My Marker"
          color="blue"
        />
        </GoogleMapReact>
      </div>
    );
  }
}