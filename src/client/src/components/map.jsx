import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';

export default class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 44.8333,
      lng: -0.5667
    },
    zoom: 11,
    height:'80vh',
    me: {
      lat: 44.8333,
      lng: -0.5667
    }
  };

  state={
    center: this.props.center,
    zoom: this.props.zoom,
    height: this.props.height,
    friends: this.props.friends,
    me: this.props.me
  }

  renderMyLocation = () =>{
    if (this.props.me !== false){
      return (<Marker
          lat={this.state.me.lat}
          lng={this.state.me.lng}
          name="Me"
          color="Gray"
        >
        </Marker>
      )
    }
  }

  renderFriends = () =>{
    let friendRendered = [];
    if (this.state.friends!==false){
      friendRendered = this.state.friends.map((element,i)=> {
        return element.status===1 ? <Marker
          key={i}
          lat={element.location.lat}
          lng={element.location.lng}
          pseudo={element.pseudoFriend}
          color={element.color}
        ></Marker> : null
      }
      );
    }
    return friendRendered;
  }
  

  render() {
    console.log(this.state.center);
    const friendRendered = this.renderFriends();
    const myLocation = this.renderMyLocation();
    return (
      // Important! Always set the container height explicitly
      <div style={{height:this.state.height, width:'100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBzU6vrdmdlct27j-d0WHX8GJ1Yx7LByXM' }}
          center={this.state.center}
          zoom={this.state.zoom}
        >
        {myLocation}
        {friendRendered}
        </GoogleMapReact>
      </div>
    );
  }
}
