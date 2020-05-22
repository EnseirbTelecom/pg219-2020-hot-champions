import React from 'react';
import{ListItem, Icon, SwipeoutActions, SwipeoutButton, Button} from 'framework7-react';



export default class Friend extends React.Component{
    constructor(props){
        super(props);
    }

    handleClick=()=>{
        const self=this;
        const app=self.$f7;
        const router=app.views.main.router;
        const url = (this.props.location?router.generateUrl({name:'homeFriend', params:{lat:this.props.location.lat, lng:this.props.location.lng}}):'/')
        router.navigate(url, {reloadCurrent:true});
    }
    
    render(){
        return(
            <ListItem title={this.props.pseudo} onClick={this.handleClick.bind(this)} onSwipeoutDeleted={this.props.action} swipeout>
                <SwipeoutActions right>
                    <SwipeoutButton delete overswipe confirmText="Are you sure you want to delete this friendship ?">Delete</SwipeoutButton>
                </SwipeoutActions>
                <SwipeoutActions left>
                    <SwipeoutButton delete overswipe confirmText="Are you sure you want to delete this friendship ?">Delete</SwipeoutButton>
                </SwipeoutActions>
                <Icon f7="map_pin_ellipse" style={{color:this.props.color}} slot="media"></Icon>
                {(this.props.request===2 ? <Button raised fill round color="green" onClick={this.props.handleClick} slot="after"> Add </Button> : null)}
                {(this.props.request===0 ? <p slot="after"> Pending </p> : null)}
            </ListItem>
        );
    }
    
}