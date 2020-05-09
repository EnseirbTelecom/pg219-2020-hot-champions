import React from 'react';
import{ListItem} from 'framework7-react';
import image from '../public/presentation.png'
export default class PositionListing extends React.Component{
  constructor(props){
    super(props);
    this.state={
        archived: this.props.archived,
    }
  }

  render(){
    return (
        <ListItem title="Position1" swipeout>
            <SwipeoutActions right>
                <SwipeoutButton delete confirmText="Are you sure you want to delete this position ?">Delete</SwipeoutButton>
            </SwipeoutActions>
            <SwipeoutActions left>
                <SwipeoutButton confirmText="Are you sure you want to archive this position ?">Archive</SwipeoutButton>
            </SwipeoutActions>
        </ListItem>
    );
  }
  
};
