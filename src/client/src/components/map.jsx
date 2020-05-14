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
    height:'80vh'
  };

  state={
    center: this.props.center,
    zoom: this.props.zoom,
    friends: this.props.friends,
  }

  componentWillMount(){
    if (this.state.center === false){
      this.setState({center: {
        lat: 44.8333,
        lng: -0.5667
      }});
    }
  }

  renderMyLocation = () =>{
    if (this.props.center !== false){
      return (<Marker
          lat={this.state.center.lat}
          lng={this.state.center.lng}
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
      friendRendered = this.state.friends.map((element,i)=>
        <Marker
          key={i}
          lat={element.location.lat}
          lng={element.location.lng}
          pseudo={element.pseudoFriend}
          color={element.color}
        ></Marker>
      );
    }
    return friendRendered;
  }
  

  render() {
    const friendRendered = this.renderFriends();
    const myLocation = this.renderMyLocation();
    return (
      // Important! Always set the container height explicitly
      <div style={{height:this.props.height, width:'100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBzU6vrdmdlct27j-d0WHX8GJ1Yx7LByXM' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
        {myLocation}
        {friendRendered}
        </GoogleMapReact>
      </div>
    );
  }
}
