import React from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Icon,
  Badge,
  Col,
  Button
} from 'framework7-react';
import Map from '../components/map';
import API from '../utils/API'


export default class extends React.Component {  
  renderBadge = () =>{
    let friends = JSON.parse(localStorage.getItem("friends"));
    let friendRequest = 0;
    friends.forEach((element)=>{
      if (!element.status){
        friendRequest++;
      }
    })
    if (friendRequest !==0){
      return <Badge color="red">{friendRequest}</Badge>
    }
    else{
      return null;
    }
  }

  render(){
    const myLocation = JSON.parse(localStorage.getItem("myLocation")).location;
    const friends = JSON.parse(localStorage.getItem("friends"));
    const badge = this.renderBadge()
    return(
      <Page name="home">
        {/* Top Navbar */}
        <Navbar>
          <NavLeft>
            <Link panelOpen="left"> 
              <Icon f7="bars"></Icon>
            </Link>
          </NavLeft>
          <NavTitle>FriendFinder</NavTitle>
          <NavRight>
            <Link panelOpen="right">
              <Icon f7="person_fill">
                {badge}
              </Icon>
            </Link>
          </NavRight>
        </Navbar>
        {/* Page content */}
        <Map height="100%" center={myLocation}  friends = {friends}/>
      </Page>
    );
  } 
} 