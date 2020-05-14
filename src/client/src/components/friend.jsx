import React from 'react';
import{ListItem, Icon, SwipeoutActions, SwipeoutButton} from 'framework7-react';


export default class Friend extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <ListItem title={this.props.pseudo} swipeout>
                <SwipeoutActions right>
                    <SwipeoutButton delete overswipe confirmText="Are you sure you want to delete this friendship ?">Delete</SwipeoutButton>
                </SwipeoutActions>
                <Icon f7="map_pin_ellipse" style={{color:this.props.color}} slot="media"></Icon>
            </ListItem>
        );
    }
    
}