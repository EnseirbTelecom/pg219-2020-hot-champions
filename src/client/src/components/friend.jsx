import React from 'react';
import{ListItem, Icon, SwipeoutActions, SwipeoutButton, Button} from 'framework7-react';
import API from '../utils/API'


export default class Friend extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ListItem title={this.props.pseudo} onSwipeoutDeleted={this.props.action} swipeout>
                <SwipeoutActions right>
                    <SwipeoutButton delete overswipe confirmText="Are you sure you want to delete this friendship ?">Delete</SwipeoutButton>
                </SwipeoutActions>
                <SwipeoutActions left>
                    <SwipeoutButton delete overswipe confirmText="Are you sure you want to delete this friendship ?">Delete</SwipeoutButton>
                </SwipeoutActions>
                <Icon f7="map_pin_ellipse" style={{color:this.props.color}} slot="media"></Icon>
                {(this.props.request ? <Button raised fill round color="green" onClick={this.props.handleClick} slot="after"> Add </Button> : null)}
            </ListItem>
        );
    }
    
}