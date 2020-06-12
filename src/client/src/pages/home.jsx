import React, {useState, useEffect} from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Icon,
  Badge,
  Preloader,
  f7
} from 'framework7-react';
import Map from '../components/map';
import {useSelector, useDispatch} from 'react-redux'
import {updateFriends, updateLocation, updateUser} from '../actions'

const Home = () => {  

  const [map, setMap] = useState(false);

  useEffect(() => {
    setMap(true);
  });
  const friends = useSelector(state=>state.friends);
  const myLocation = useSelector(state=>state.location.location);
  const renderBadge = () =>{
    
    let friendRequest = 0;
    if(friends){
      friends.forEach((element)=>{
        if (element.status===2){
          friendRequest++;
        }
      })
    }
    if (friendRequest !==0){
      return <Badge color="red">{friendRequest}</Badge>
    }
    else{
      return null;
    }
  }
  const badge = renderBadge();
  let center;
  const route = f7.views.main.router.currentRoute;
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
      {(map ? <Map height="100%" center={center} me={myLocation} zoom = {11} friends={friends}/>:<Preloader></Preloader>)}
    </Page>
  );
}

export default Home;
  
