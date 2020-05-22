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
  Button,
  Preloader
} from 'framework7-react';
import Map from '../components/map';
import API from '../utils/API'


export default class extends React.Component {  
  constructor(props){
    super(props)
    this.state={
      friends:JSON.parse(localStorage.getItem("friends")),
      map:false,
    }
  }

  componentDidMount(){
    this.setState({map:true})
  }

  renderBadge = () =>{
    let friends = this.state.friends
    let friendRequest = 0;
    friends.forEach((element)=>{
      if (element.status===2){
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
    const friends = this.state.friends;
    const badge = this.renderBadge()
    let center;
    const route = this.$f7.views.main.router.currentRoute;
    if (route.name === "homeFriend"){
      center = {lat:parseFloat(route.params.lat), lng: parseFloat(route.params.lng)};
    }else{
      center = myLocation
    }

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
        {(this.state.map ? <Map height="100%" center={center} me={myLocation} zoom = {11} friends={friends}/>:<Preloader></Preloader>)}
      </Page>
    );
  } 
} 