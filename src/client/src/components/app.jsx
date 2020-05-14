import React from 'react';
import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
import {
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  Link,
  Block,
  Subnavbar,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  Button,
  Icon,
  ListItem,
  ListInput,
  Searchbar,
  ListButton,
  BlockFooter,
  ListGroup,
  Range,
  Preloader
} from 'framework7-react';

import cordovaApp from '../js/cordova-app';
import routes from '../js/routes';
import Friend from './friend'
import { ListItemSecondaryAction } from '@material-ui/core';
import Map from './map';
import API from '../utils/API';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      // Framework7 Parameters
      f7params: {
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
      },
      form: {
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
      },
      renderedMap: false,
    };
  }

  componentWillMount(){
    localStorage.setItem("friends", JSON.stringify([{location: {lat:44, lng:-0.5}, pseudoFriend:"testo", status: true, color:"#997a8d"}, {location: {lat:44.6, lng:-0.57}, pseudoFriend:"polo", status:false, color:"#f0c300"}]));
    localStorage.setItem("myLocation", JSON.stringify({location:{lat: 44.8333,lng: -0.5667}, time:{date:"12/05/2020", hour:"12h20"}}));
    this.getMyPosition();
    this.getFriends();
    this.setDate();
    navigator.geolocation.getCurrentPosition((position) => {
      this.setPosition(position.coords.latitude, position.coords.longitude);
    }, (error)=>console.log(error));
  }

  

  setPosition = (lat, lng) =>{
    this.setState(state=>(state.form.location.lat = lat, status));
    this.setState(state=>(state.form.location.lng = lng, status));
    this.setState({renderedMap:true});
    
  }

  setDate=()=>{
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
    this.setState(state=>(state.form.time.date = dd+"/"+mm+"/"+yy, status));
    this.setState(state=>(state.form.time.hour = hh+"h"+minmin, status));
  }

  displayDate = () =>{
    return this.state.form.time.date+" at "+this.state.form.time.hour;
  } 

  getFriends =async()=>{
    try{
      const {status, friends} = await API.getFriends(localStorage.getItem("token"));
      if (status===200){
        localStorage.setItem("friends", friends);
      }
    }
    catch(e){
      if (e.response.status ===403){
        localStorage.setItem("friends", false);
      }
      else if (e.response.status === 400 || e.response.status === 401){
        console.log("error");
        this.$f7router.navigate('/');
      }
    }
  }
  getMyPosition = async ()=>{
    try{
      const {status, data} = await API.getCurrentLocation(localStorage.getItem("token"));
      if (status===200){
        localStorage.setItem("myLocation", data.location);
      }
    }
    catch(e){
      if (e.response.status ===406){
        localStorage.setItem("myLocation", false);
      }
      else if (e.response.status === 400 || e.response.status === 401){
        console.log("error");
        this.$f7router.navigate('/');
      }
    }
  }
  
  async addLocation () {
    const self = this;
    const app = self.$f7;
    const router = self.$f7.views.main.router;
    try{
      const {status, result} = await API.addLocation(localStorage.getItem("token"),self.state.form);
      if (status===200){
        app.dialog.alert("Current Position Added");
        router.navigate('/posistions/')
      }
    }
    catch(error){
      if (error.response.status === 400 || error.response.status === 401){
        app.dialog.alert("Error try again");
      }
    }
  }

  renderFriends = () =>{
    let friends = JSON.parse(localStorage.getItem("friends"));
    let friendsRendered = [];
    if (friends!==false){
      friendsRendered = friends.map((element,i)=>
        <Friend key={i} pseudo={element.pseudoFriend} color={element.color}></Friend>
      );
    }
    return friendsRendered;
  }

  signout = () =>{
    const self = this;
    const router = self.$f7.views.main.router;
    localStorage.clear();
    router.navigate('/');
  }


  componentDidMount() {
    this.$f7ready((f7) => {
      // Init cordova APIs (see cordova-app.js)
      if (Device.cordova) {
        cordovaApp.init(f7);
      }
      // Call F7 APIs here
      this.$f7.on('panelOpened', ()=>{
        let searchbar= this.$f7.searchbar.get('.searchbar');
        if (localStorage.getItem("friendClicked")!=="false"){
          searchbar.search(localStorage.getItem("friendClicked"));

        }
      })
    });
  }

  render() {
    const renderedFriends = this.renderFriends();
    return (
      <App params={ this.state.f7params } themeLight>
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
                      title="Titi"
                    ></ListItem>
                    <ListItem
                      header = "Last Name" 
                      title="Tarent"
                    ></ListItem>
                    <ListItem
                      header = "Pseudo" 
                      title="totodu46"
                    >
                    </ListItem>
                    <ListItem
                      header = "Email" 
                      title="example@example.com"
                    >
                    </ListItem>
                    <ListItem
                      header = "Birthdate" 
                      title="08/08/1988"
                    ></ListItem>
                    <ListItem
                      link="#"
                      header = "Password" 
                      title="**************"
                      after="Change"
                    >
                    </ListItem>
                    <ListButton color="red" onClick={this.signout.bind(this)}>Sign Out</ListButton>
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
                disableButton={!this.$theme.aurora}
              ></Searchbar>
              <List className="searchbar-not-found">
                <ListItem title="Nothing found" />
              </List>
              <List inset className="search-list searchbar-found">
                <ListGroup>
                  <ListItem groupTitle title="Swipe left to delete"></ListItem>
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
              <Block>
                {this.state.renderedMap ? <Map height = "30vh" friends={false} zoom={15} center={{lat: this.state.form.location.lat, lng: this.state.form.location.lng}}></Map> :  <Preloader></Preloader>}
                <List noHairlinesMd form>
                  <ListItem header="Latitude" title={this.state.form.location.lat}></ListItem>
                  <ListItem header="Longitude" title={this.state.form.location.lng}></ListItem>
                  <ListItem header="Date" title={this.displayDate()}></ListItem>
                  <ListInput
                    label="Message"
                    type="textarea"
                    placeholder="Describe what are you doing."
                    resizable
                    value = {this.state.form.message}
                    onInput={(e) => {
                    const {name, value} = e.target;
                    this.setState(state=>(state.form.message= value,state));
                    }}
                  ></ListInput>
                  <ListInput
                    label="How many time will you spend here ?"
                    type="select"
                    input={false}
                  >
                    <Range slot="input" value={12} min={1} max={72} step={1} label={true} onRangeChange={(value)=>this.setState(state=>(state.form.validity= value, state))}/>
                  </ListInput>
                  <ListButton onClick={this.addLocation.bind(this)}>Add this location</ListButton>
                </List>
              </Block>
            </Page>
          </View>
        </Popup>
      </App>
    )
  }
}