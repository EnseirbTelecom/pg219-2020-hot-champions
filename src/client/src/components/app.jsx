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
  ListGroup
} from 'framework7-react';

import cordovaApp from '../js/cordova-app';
import routes from '../js/routes';
import Friend from './friend'
import { ListItemSecondaryAction } from '@material-ui/core';

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
      // Login screen demo data
      username: '',
      password: '',
    }
  }
  render() {
    return (
      <App params={ this.state.f7params } themeLight>

        {/* Left panel with cover effect*/}
        <Panel left cover themeLight>
          <View>
            <Page>
              <Navbar title="Navigation"/>

              <Block>
                <List>
                  <ListItem link="#" title="My positions"></ListItem>
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
                    <ListButton color="red">Deconnexion</ListButton>
                  </ListGroup>
                </List>
              </Block>
            </Page>
          </View>
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
                  <Link href="/friendForm/">
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
              <List className="search-list searchbar-found">
                <ListGroup>
                  <ListItem groupTitle title="Swipe left to delete your friend"></ListItem>
                  <Friend name="Kevin Tran" pseudo= "TOTO" color= "secondary"></Friend>
                  <Friend name="Harry Potter" pseudo= "TULIPE" color= "primary"></Friend>
                </ListGroup>
              </List>
            </Page>
          </View>
        </Panel>


        {/* Your main view, should have "view-main" class */}
        <View main className="safe-areas" url="/" />


        {/* Popup */}
        <Popup id="my-popup">
          <View>
            <Page>
              <Navbar title="Popup">
                <NavRight>
                  <Link popupClose>Close</Link>
                </NavRight>
              </Navbar>
              <Block>
                <p>Popup content goes here.</p>
              </Block>
            </Page>
          </View>
        </Popup>

        <LoginScreen id="my-login-screen">
          <View>
            <Page loginScreen>
              <LoginScreenTitle>Login</LoginScreenTitle>
              <List form>
                <ListInput
                  type="text"
                  name="username"
                  placeholder="Your username"
                  value={this.state.username}
                  onInput={(e) => this.setState({username: e.target.value})}
                ></ListInput>
                <ListInput
                  type="password"
                  name="password"
                  placeholder="Your password"
                  value={this.state.password}
                  onInput={(e) => this.setState({password: e.target.value})}
                ></ListInput>
              </List>
              <List>
                <ListButton title="Sign In" onClick={() => this.alertLoginData()} />
                <BlockFooter>
                  Some text about login information.<br />Click "Sign In" to close Login Screen
                </BlockFooter>
              </List>
            </Page>
          </View>
        </LoginScreen>
      </App>
    )
  }
  alertLoginData() {
    this.$f7.dialog.alert('Username: ' + this.state.username + '<br>Password: ' + this.state.password, () => {
      this.$f7.loginScreen.close();
    });
  }
  componentDidMount() {
    this.$f7ready((f7) => {
      // Init cordova APIs (see cordova-app.js)
      if (Device.cordova) {
        cordovaApp.init(f7);
      }
      // Call F7 APIs here
    });
  }
}