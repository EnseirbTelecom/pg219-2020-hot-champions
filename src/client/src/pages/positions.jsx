import React from 'react';
import { Page, Navbar, Block, BlockTitle,List,ListItem,ListGroup,Button} from 'framework7-react';
import Map from '../components/map'
import PositionListing from'../components/position'

export default class Positions extends React.Component {
  constructor(props){
    super(props);
    this.state={
      archivedPositions: [],
      currentPosition: JSON.parse(localStorage.getItem("myLocation"))
    };
  }

  componentDidMount() {
    this.getArchivedPositions();
    this.setState({archivedPositions: false});
  }

  getArchivedPositions= async () =>{
    try{
        const {status, data} = await API.history(localStorage.getItem("token"));
        if (status === 200){
            this.setState({archivedPositions: data});
        }
    }
    catch(error){
        if (error.response.status === 406){
            this.setState({archivedPositions: false});
        }
        else if (error.response.status === 400 || error.response.status === 401){
            console.log("error");
        }
    } 
  }
// location={element.location} time={element.time}
  renderAllArchivedPositions = () =>{
    let returnedComponents = [];
    if (this.state.archivedPositions !== false){
      returnedComponents = this.state.archivedPositions.map( (item, i) => <PositionListing key={i} location={item.location} time={item.time} archived={true}></PositionListing>)
    }
    else{
      returnedComponents = <ListItem title="No archived position"></ListItem>
    }
    return returnedComponents;
  }
// location={this.state.currentPosition.location} time={this.state.currentPosition.time}
  renderCurrentLocation = () =>{
    let returnedComponents;
    if (this.state.currentLocation !== false){
      returnedComponents= <PositionListing location={this.state.currentPosition.location} time={this.state.currentPosition.time} archived={false}></PositionListing>;
    }
    else{
      returnedComponents = <ListItem><Button popupOpen="#popup-location" fill color="green">Add current position</Button></ListItem>;
    }
    return returnedComponents;
  }


  render(){
    const archivedPositions = this.renderAllArchivedPositions();
    const currentLocation = this.renderCurrentLocation();
    return(
      <Page name="positions">
        <Navbar title="Positions" backLink="Back" />
        <Map height="50vh" zoom={13} friends={false} center={this.state.currentPosition.location} ></Map>
        <Block>
          <BlockTitle>Swipe right to archive, swipe left to delete</BlockTitle>
          <List>
            <ListGroup>
              <ListItem groupTitle title="Current Position">
              </ListItem>
              {currentLocation}
            </ListGroup>
            <ListGroup>
              <ListItem groupTitle title="Archived Positions"></ListItem>
              {archivedPositions}
            </ListGroup> 
          </List>
        </Block>
      </Page>
    );
  }
}