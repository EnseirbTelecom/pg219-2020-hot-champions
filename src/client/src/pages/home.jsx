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
import Position from '../utils/Position';


export default () => {
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
              <Badge color="red">5</Badge>
            </Icon>
          </Link>
        </NavRight>
      </Navbar>
      {/* Page content */}
      <Map/>
      <Block>
        <Button width="50" className="demo-col-center-content" fill onClick={()=>Position.getCurrentPosition()}>Get Position</Button>
      </Block>

    </Page>
  );
} 