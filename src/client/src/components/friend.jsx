import React from 'react';
import{ListItem, Icon, SwipeoutActions, SwipeoutButton} from 'framework7-react';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';


export default class Friend extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <ListItem title={this.props.name} swipeout after={this.props.pseudo}>
                <SwipeoutActions right>
                    <SwipeoutButton delete overswipe confirmText="Are you sure you want to delete this friendship ?">Delete</SwipeoutButton>
                </SwipeoutActions>
                <Icon slot="media"><GpsFixedIcon color={this.props.color}></GpsFixedIcon></Icon>
            </ListItem>
        );
    }
    
}