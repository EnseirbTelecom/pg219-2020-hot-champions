import React from 'react';
import{Page, LoginScreenTitle, List, ListInput, ListButton, BlockFooter, Link} from 'framework7-react';
import API from '../utils/API'

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      validated:0,
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
            onValidate={(isValid) => this.state.validated++}
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
            onValidate={(isValid) => this.state.validated++}
            placeholder="***********"
            value={this.state.password}
            onInput={(e) => {
              this.setState({ password: e.target.value});
            }}
          />
        </List>
        <List>
          <ListButton onClick={this.signIn.bind(this)}>Sign In</ListButton>
          <BlockFooter>
            <p>Not registered yet ?</p>
            <Link href="/signup/" color="blue"> Sign Up</Link>
          </BlockFooter>
        </List>
      </Page>
    )
  }
  async signIn() {
    const self = this;
    const app = self.$f7;
    const router = self.$f7.views.main.router;
    if (self.state.validated === 2){
        try{
            const {status, result} = await API.login(self.state.email,self.state.password)
            if (status===200){
              localStorage.setItem("token",result.token);
              localStorage.setItem("user",result.user);
              router.navigate('/');
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