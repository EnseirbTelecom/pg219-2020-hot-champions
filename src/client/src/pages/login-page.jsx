import React from 'react';
import{Page, LoginScreenTitle, List, ListInput, ListButton, BlockFooter, Link, Block} from 'framework7-react';
import API from '../utils/API'

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      validated:false,
    };
  }

  render() {
    return (
      <Page noToolbar noNavbar noSwipeback loginScreen>
        <LoginScreenTitle>FriendFinder</LoginScreenTitle>
        <List form>
          <ListInput
            label="Email"
            type="email"
            required
            validate
            onValidate={(isValid) => this.setState({validated:true})}
            placeholder="example@example.com"
            value={this.state.email}
            onInput={(e) => {
              this.setState({ email: e.target.value});
            }}
          />
          <ListInput
            label="Password"
            type="password"
            required
            validate
            placeholder="***********"
            value={this.state.password}
            onInput={(e) => {
              this.setState({ password: e.target.value});
            }}
          />
          <Block>
            <ListButton onClick={this.signIn.bind(this)}>Sign In</ListButton>
            <BlockFooter>
              <p>Not registered yet ?</p>
              <Link href="/signup/" color="blue"> Sign Up</Link>
            </BlockFooter>
          </Block>
        </List>
      </Page>
    )
  }
  async signIn() {
    const self = this;
    const app = self.$f7;
    const router = self.$f7.views.main.router;
    console.log(self.state)
    if (self.state.validated&&self.state.password&&self.state.email){
        try{
            const {status, data} = await API.login(self.state.email,self.state.password)
            if (status===200){
              localStorage.setItem("token",data.token);
              localStorage.setItem("user",data.user);
              router.navigate('/', {reloadCurrent:true});
            }
        }
        catch(error){
            if (error.response.status === 403){
              app.dialog.alert("User Not Found");
            }
            else if(error.response.status === 405){
              app.dialog.alert("Wrong Password");
            }
        }
        
    }
    else{
        app.dialog.alert("Missing informations")
    }
  }
}