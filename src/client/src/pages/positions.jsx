import React, {useState, useEffect} from 'react';
import { Page, Navbar, Block, BlockTitle,List,ListItem,ListGroup,Button} from 'framework7-react';
import Map from '../components/map'
import PositionListing from'../components/position'
import {useSelector, useDispatch} from 'react-redux'
import {updateFriends, updateLocation, updateUser} from '../actions'

const  Positions = () => {
  
  const location = useSelector(state=>state.location);
  const [archivedPositions, setArchivedPositions] = useState([]);
  const [currentPosition, setCurrentPosition] =  useState(location);

  useEffect(()=>{
    getArchivedPositions();
  })

  const getArchivedPositions = async () =>{
    try{
        const {status, data} = await API.history(localStorage.getItem("token"));
        if (status === 200){
            setArchivedPositions(data);
        }
    }
    catch(error){
        if (error.response.status === 406){
            setArchivedPositions(false);
        }
        else if (error.response.status === 400 || error.response.status === 401){
            console.log("error");
        }
    } 
  }
// location={element.location} time={element.time}
  const renderAllArchivedPositions = () =>{
    let returnedComponents = [];
    if (archivedPositions !== false){
      returnedComponents = archivedPositions.map( (item, i) => <PositionListing key={i} location={item.location} time={item.time} archived={true}></PositionListing>)
    }
    else{
      returnedComponents = <ListItem title="No archived position"></ListItem>
    }
    return returnedComponents;
  }
// location={this.state.currentPosition.location} time={this.state.currentPosition.time}
  const renderCurrentLocation = () =>{
    let returnedComponents;
    if (currentPosition !== false){
      returnedComponents= <PositionListing location={currentPosition.location} time={currentPosition.time} archived={false}></PositionListing>;
    }
    else{
      returnedComponents = <ListItem><Button popupOpen="#popup-location" fill color="green">Add current position</Button></ListItem>;
    }
    return returnedComponents;
  }
  const renderArchivedPositions = renderAllArchivedPositions();
  const currentLocationRendered = renderCurrentLocation();
  return(
    <Page name="positions">
      <Navbar title="Positions" backLink="Back" />
      <Map height="50vh" zoom={13} friends={false} center={currentPosition.location} me={currentPosition.location}></Map>
      <Block>
        <BlockTitle>Swipe right to archive, swipe left to delete</BlockTitle>
        <List>
          <ListGroup>
            <ListItem groupTitle title="Current Position">
            </ListItem>
            {currentLocationRendered}
          </ListGroup>
          <ListGroup>
            <ListItem groupTitle title="Archived Positions"></ListItem>
            {renderArchivedPositions}
          </ListGroup> 
        </List>
      </Block>
    </Page>
  );
}
export default Positions;