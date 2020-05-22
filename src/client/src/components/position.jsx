import React from 'react';
import{ListItem, SwipeoutActions, SwipeoutButton,Button} from 'framework7-react';
export default class PositionListing extends React.Component{
  constructor(props){
    super(props);
    this.state={
        archived: this.props.archived,
        location: this.props.location,
        time: this.props.time
    }
  }


  isArchived=()=>{
    if(!this.state.archived){
      return (<Button slot="after" popupOpen="#popup-location" fill color="green">Add New One</Button>)
    }
  }

  isArchivable=()=>{
    if(!this.state.archived){
      return (
        <SwipeoutActions left>
          <SwipeoutButton confirmText="Are you sure you want to archive this position ?">Archive</SwipeoutButton>
        </SwipeoutActions>
      )
    }
  }

  render(){
    return (
      <ListItem title={this.state.time.date + " at "+this.state.time.hour} footer={"longitude : "+this.state.location.lng+", latitude : "+this.state.location.lat} swipeout>
          <SwipeoutActions right>
              <SwipeoutButton delete confirmText="Are you sure you want to delete this position ?">Delete</SwipeoutButton>
          </SwipeoutActions>
          {this.isArchivable()}
          {this.isArchived()}
      </ListItem>
    );
  }
  
};
