import React from 'react';
import {
  Page,
  Navbar,
  List,
  ListInput,
  ListItem,
  Toggle,
  BlockTitle,
  Row,
  Button,
  Range,
  Block,
  $f7
} from 'framework7-react';
import API from '../utils/API'

export default class extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:''
    };
  }

  addFriend = async ()=>{
    const self = this;
    const app = self.$f7;
    const router = app.views.main.router;
    try{
      const {status, data} = await API.addFriend(localStorage.getItem("token"), this.state.email);
      if (status===200){
        app.dialog.alert("Friend request sent");
        router.back()
      }
    }
    catch(e){
      if (e.response.status === 403){
        app.dialog.alert("User not found");
      }
      else if(e.response.status === 400 || e.response.status === 401){
        app.dialog.alert("Error, try again");
      }
    }
    
  }

  render(){
    return (
    <Page name="form">
      <Navbar backLink="Back"></Navbar>
      <BlockTitle>Add Friend</BlockTitle>
      <List noHairlinesMd inset>
        <ListInput
          label="E-mail"
          type="email"
          placeholder="example@example.com"
          required
          validate
          value = {this.state.email}
          onInput={(e) => {
            const {name, value} = e.target;
            this.setState(state=>(state.email= value,state));
          }}
        ></ListInput>
        <ListItem>
          <Button fill color="green" onClick={this.addFriend.bind(this)}>Add</Button>
        </ListItem>
      </List>
    </Page>);
  }
}
