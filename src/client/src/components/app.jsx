import React, {useState, useEffect} from 'react';
import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
import {
  App,
  Panel,
  View,
  Popup,
  Page,
  Navbar,
  NavRight,
  NavLeft,
  NavTitle,
  Link,
  Block,
  List,
  Icon,
  ListItem,
  ListInput,
  Searchbar,
  ListButton,
  ListGroup,
  Range,
  Preloader,
  f7,
  f7ready,
  f7router
} from 'framework7-react';

import cordovaApp from '../js/cordova-app';
import routes from '../js/routes';
import Friend from './friend'
import Map from './map';
import API from '../utils/API'

import {useSelector, useDispatch} from 'react-redux'
import {updateFriends, updateLocation, updateUser} from '../actions'
const jwtDecode = require("jwt-decode");

export const AppFF = () => {
  const token = localStorage.getItem("token");
  const friends = useSelector(state=>state.friends);
  const position = useSelector (state=>state.location);
  const dispatch = useDispatch();
  const user = jwtDecode(localStorage.getItem("token"));
  //const user = useSelector(state=>state.user);
  const [f7params, setF7params] = useState({
    id: 'io.framework7.myapp', // App bundle ID
    name: 'FriendFinder', // App name
    theme: 'auto', // Automatic theme detection


    // App routes
    routes: routes,


    // Input settings
    input: {
      scrollIntoViewOnFocus: Device.cordova && !Device.electron,
      scrollIntoViewCentered: Device.cordova && !Device.electron,
    },
    // Cordova Statusbar settings
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
  });
  const [form, setForm]= useState({
    message:'',
    validity:12,
    time:{
      date:'',
      hour:''
    },
    location:{
      lat:0,
      lng:0
    }
  });
  const [renderedMap,setRenderedMap]=useState(true);

  
 
  const setPosition = (lat, lng) =>{
    setForm({
      ...form,
      location : {
        lat : lat,
        lng : lng,
      }}); 
    setRenderedMap(true);
  }

  const setDate=()=>{
    
    let dateTime = new Date();
    let mm = dateTime.getMonth() + 1;
    mm = (mm>9 ? '' : '0') + mm;
    let dd = dateTime.getDate()
    dd = (dd>9 ? '' : '0') + dd;
    let yy = dateTime.getFullYear();
    let hh = dateTime.getHours();
    hh = (hh>9 ? '' : '0') + hh;
    let minmin = dateTime.getMinutes();
    minmin = (minmin>9 ? '' : '0') + minmin;
    setForm({
      ...form,
      time:{
        date:dd+"/"+mm+"/"+yy,
        hour:  hh+"h"+minmin,
      }
    })
    console.log("time:" + JSON.stringify(form.time));
  }

const setBirthDate =()=>{

  if(user){
    let birthDate = new Date((user?user.birthDate:null));
    let mm = birthDate.getMonth() + 1;
    mm = (mm>9 ? '' : '0') + mm;
    let dd = birthDate.getDate()
    dd = (dd>9 ? '' : '0') + dd;
    let yy = birthDate.getFullYear();
    return (dd+"/"+mm+"/"+yy);
  }    
}

const getFriends = async () =>{
  
  try{
    const {status, data} = await API.getFriends(token);
    if (status===200){
      dispatch(updateFriends(data));
    }
  }
  catch(e){
    if (e.response.status ===403){
      dispatch(updateFriends(false));
      }
    else if (e.response.status === 400 || e.response.status === 401){
      console.log("error");
      f7router.navigate('/', {reloadCurrent:true});
    }
  }
}
const getMyPosition = async ()=>{
    try{

      const {status, data} = await API.getCurrentLocation(user.email, token);
      if (status===200){
          dispatch(updateLocation(data));
      }
    }
    catch(e){
      console.log(e);
      if (e.response.status ===406){
          dispatch(updateLocation(false));
      }
      else if (e.response.status === 400 || e.response.status === 401){
          console.log("error");
          f7router.navigate('/', {reloadCurrent:true});
      }
    }
}

const addLocation = async () => {
    
    const app = f7;
    const router = app.views.main.router;
    try{
      const {status, data} = await API.addLocation(token,form);
      if (status===200){
          app.dialog.alert("Current Position Added");
          getMyPosition();
          router.navigate('/posistions/', {reloadCurrent:true})
      }
    }
    catch(error){
      if (error.response.status === 400 || error.response.status === 401){
          app.dialog.alert("Error try again");
      }
    }
}

const onDeleted = async (email) =>{
    
    const app = f7;
    const router = app.views.main.router;
    try{
      const {status, data} = await API.deleteFriend(token, email)
      if(status === 200){
        app.dialog.alert("Friend Deleted");
        getFriends();
        router.refreshPage('/');
      }
    }
    catch(e){
        if (e.response.status  === 403 || e.response.status  === 407){
            app.dialog.alert("Friend Request or User no longer available")
            router.navigate('/', {reloadCurrent:true});
        }
        else if(e.response.status  === 401|| e.response.status  === 400){
            console.log("error");
            router.navigate('/', {reloadCurrent:true});
        }
    } 
} 

const handleClick = async (email) =>{
    const app = f7;
    const router = app.views.main.router;
    app.dialog.alert("Friend Added");
    try{
      const {status, data} = await API.acceptFriend(token, email)
      if(status === 200){
        app.dialog.alert("Friend Added");
        getFriends();
        router.refreshPage('/');
      }
    }
    catch(e){
      if (e.response.status  === 407){
        app.dialog.alert("Friend Request no longer available")
        router.navigate('/', {reloadCurrent:true});
      }
      else if(e.response.status  === 401 || e.response.status  === 400){
        console.log("error");
        router.navigate('/', {reloadCurrent:true});
      }
    } 
  }

  const displayDate = () =>{
    return form.time.date+" at "+form.time.hour;
  } 

  

  const renderFriends = () =>{
    let friendsRendered = [];
    if (friends!==false){
      friendsRendered = friends.map((element,i)=>
        (element.status===1 ? <Friend key={i} pseudo={element.pseudoFriend} location={element.location} action={onDeleted.bind(this)} color={element.color}></Friend> : null)
      );
    }
    return friendsRendered;
  }

  const renderFriendsRequest = () =>{
    let friendsRendered = [];
    let list = [<ListItem groupTitle title="Friend Requests"></ListItem>];
    if (friends){
      friendsRendered = friends.map((element,i)=>
        (element.status===0 || element.status===2 ? <Friend key={i} pseudo={element.pseudoFriend} handleClick={handleClick.bind(element.email)} action={onDeleted.bind(element.email)} request={element.status}></Friend> : null)
      );
    }
    return list.concat(friendsRendered);
  }

  

  const signout = () =>{
    const router = f7.views.main.router;
    router.navigate('/login-page/', {reloadCurrent:true});
  }


  useEffect(() => {
    f7ready((f7) => {
      // Init cordova APIs (see cordova-app.js)
      if (Device.cordova) {
        cordovaApp.init(f7);
      }
      // Call F7 APIs here
      
      f7.on('panelOpened', ()=>{
        let searchbar = f7.searchbar.get('.searchbar');    
        if (localStorage.getItem("friendClicked")!=="false"){
          searchbar.search(localStorage.getItem("friendClicked"));
        }
      })
      f7.on('popupOpen', ()=>{
        setDate();
      })

      getMyPosition();
      
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition(position.coords.latitude, position.coords.longitude);
      }, (error)=>console.log(error));
    });
  });

  
  const renderedFriends = renderFriends();
  const renderedFriendRequests = renderFriendsRequest();
  return (
    <App params={ f7params } themeLight>
      {/* Left panel with cover effect*/}
      <Panel left cover themeLight>
          <Page>
            <Navbar title="Navigation"/>

            <Block>
              <List>
                <ListItem link="/positions/" panelClose title="My positions"></ListItem>
              </List>
              <List>
                <ListGroup>
                  <ListItem groupTitle title="My information" ></ListItem>
                  <ListItem
                    header = "First Name" 
                    title={(user?user.firstName:null)}
                    tooltip	= {(user?user.firstName:null)}
                    tooltipTrigger="hover"
                  ></ListItem>
                  <ListItem
                    header = "Last Name" 
                    title={(user?user.lastName:null)}
                    tooltip	= {(user?user.lastName:null)}
                    tooltipTrigger="hover"
                  ></ListItem>
                  <ListItem
                    header = "Pseudo" 
                    title={(user?user.pseudo:null)}                     
                    tooltip	= {(user?user.pseudo:null)}                     
                    tooltipTrigger="hover"
                  >
                  </ListItem>
                  <ListItem
                    header = "Email" 
                    title={(user?user.email:null)}
                    tooltip	= {(user?user.email:null)}                    
                    tooltipTrigger="hover"
                  >
                  </ListItem>
                  <ListItem
                    header = "Birthdate" 
                    title={setBirthDate()}
                  ></ListItem>
                  <ListItem
                    header = "Password" 
                    title="**************"
                  >
                  </ListItem>
                  <ListButton color="red" panelClose onClick={()=>signout()}>Sign Out</ListButton>
                </ListGroup>
              </List>
            </Block>
          </Page>
      </Panel>

      {/* Right panel with cover effect*/}
      <Panel right cover themeLight>
        <View>
          <Page>
            <Navbar>
              <NavLeft>
                <NavTitle>Friends</NavTitle>
              </NavLeft>
              <NavRight>
                <Link href="/friend-form/">
                  <Icon f7="person_badge_plus_fill">
                  </Icon>
                </Link>
              </NavRight>
            </Navbar>
            <Searchbar
              searchContainer=".search-list"
              searchIn=".item-title"
              disableButton
            ></Searchbar>
            <List className="searchbar-not-found">
              <ListItem title="Nothing found" />
            </List>
            <List>
              <ListItem title = "Swipe to delete"><Icon f7="arrow_right_arrow_left" slot="media" color="red"></Icon></ListItem>
            </List>
            <List inset className="search-list searchbar-found">
              <ListGroup>
                {renderedFriendRequests}
              </ListGroup>
            </List>
            <List inset className="search-list searchbar-found">
              <ListGroup>
                <ListItem groupTitle title="Friends"></ListItem>
                {renderedFriends}
              </ListGroup>
            </List>
          </Page>
        </View>
      </Panel>


      {/* Your main view, should have "view-main" class */}
      <View main className="safe-areas" url="/" />


      {/* Popup */}
      <Popup id="popup-location">
        <View>
          <Page>
            <Navbar title="Add your position">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            {renderedMap ? <Map height = "30vh" friends={false} zoom={15} center={position.location} me={position.location}></Map> :  <Block className="text-align-center"><Preloader size={42}></Preloader></Block>}
            <Block>
              <List noHairlinesMd form>
                <ListItem header="Latitude" title={form.location.lat}></ListItem>
                <ListItem header="Longitude" title={form.location.lng}></ListItem>
                <ListItem header="Date" title={displayDate()}></ListItem>
                <ListInput
                  label="Message"
                  type="textarea"
                  placeholder="Describe what are you doing."
                  resizable
                  value = {form.message}
                  onInput={(e) => {
                  const {name, value} = e.target;
                  setForm({
                    ...form,
                    message : value,})}}
                  
                ></ListInput>
                <ListInput
                  label="How many time will you spend here ?"
                  type="select"
                  input={false}
                >
                  <Range slot="input" value={12} min={1} max={72} step={1} label={true} onRangeChange={(value)=>setForm({...form, validity: value})}/>
                </ListInput>
                <ListButton onClick={()=>addLocation()}>Add this location</ListButton>
              </List>
            </Block>
          </Page>
        </View>
      </Popup>
    </App>
  )
}
