import React from 'react';
import{Page, LoginScreenTitle, List, ListInput, ListButton, BlockFooter, Link, Block} from 'framework7-react';
import API from '../utils/API'

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        password: '',
        firstName: '',
        lastName:'',
        pseudo:'',
        birthdate:'',
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
                validate
                required
                onValidate={isValid=>this.setState({validated:isValid})}
                placeholder="example@example.com"
                value = {this.state.email}
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
                value = {this.state.password}
                onInput={(e) => {
                this.setState({ password: e.target.value});
                }}
            />
            <ListInput
                label="First Name"
                type="text"
                required
                validate
                placeholder="Your Frist Name"
                value = {this.state.firstName}
                onInput={(e) => {
                this.setState({ firstName: e.target.value});
                }}
            />
            <ListInput
                label="Last Name"
                type="text"
                required
                validate
                placeholder="Your Last Name"
                value = {this.state.lastName}
                onInput={(e) => {
                this.setState({ lastName: e.target.value});
                }}
            />
            <ListInput
                label="Pseudo"
                type="text"
                required
                validate
                placeholder="Your Pseudo"
                value = {this.state.pseudo}
                onInput={(e) => {
                this.setState({ pseudo: e.target.value});
                }}
            />
            <ListInput
                label="Birthdate"
                type="datepicker"
                placeholder="Select date"
                readonly        
                required
                calendarParams={{openIn: 'customModal', header: true, footer: true, dateFormat: 'dd mm yyyy', disabled: {
                    from: new Date()
                },}}
                value = {this.state.birthdate}
                onCalendarChange={(e) => {
                  this.setState({ birthdate: e});
                }}
            />
          <Block>
            <ListButton onClick={this.signup.bind(this)}>Sign Up</ListButton>
            <BlockFooter>
              <p>Already registered ?</p>
              <Link href="/" color="blue"> Sign In</Link>
            </BlockFooter>
          </Block>
        </List>
      </Page>
    )
  }
  async signup() {
    const self = this;
    const app = self.$f7;
    const router = self.$f7.views.main.router;
    if (self.state.validated&&self.state.email&&self.state.password&&self.state.firstName&&self.state.lastName&&self.state.pseudo&&self.state.birthdate){
        try{
            const {status, data} = await API.signup(self.state.email,self.state.password,self.state.firstName, self.state.lastName,self.state.pseudo, self.state.birthdate)
            if (status===200){
                localStorage.setItem("token",data.token);
                localStorage.setItem("user",data.user);
                console.log("good")
                //router.navigate('/',{reloadCurrent:true});
            }
        }
        catch(error){
            if (error.response.status === 402){
                app.dialog.alert("User Already Exist")
            }
        }
        
    }
    else{
        app.dialog.alert("Missing informations")
    }
  }
}