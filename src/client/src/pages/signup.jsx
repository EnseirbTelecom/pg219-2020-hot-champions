import React,{useState} from 'react';
import{Page, LoginScreenTitle, List, ListInput, ListButton, BlockFooter, Link, Block, f7, f7router} from 'framework7-react';
import API from '../utils/API'
import {useSelector, useDispatch} from 'react-redux'
import {updateUser, signIn} from '../actions'

const Signup =()=> {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [validation, setValidation] = useState(false);
    const dispatch = useDispatch();
    
    const  signup = async () => {
      const app = f7;
      const router = f7.views.main.router;
      
      if (validation&&email&&password&&firstName&&lastName&&pseudo&&birthdate){
          try{
              const {status, data} = await API.signup(email,password,firstName, lastName,pseudo, birthdate)
              if (status===200){
                  dispatch(updateUser(data.user));
                  dispatch(signIn(data.token));
                  router.navigate('/',{reloadCurrent:true});
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
    };

    return (
      <Page noToolbar noNavbar noSwipeback loginScreen>
        <LoginScreenTitle>FriendFinder</LoginScreenTitle>
        <List form>
            <ListInput
                label="Email"
                type="email"
                validate
                required
                onValidate={isValid=>setValidation(isValid)}
                placeholder="example@example.com"
                value = {email}
                onInput={(e) => {
                  setEmail(e.target.value);
                }}
            />
            <ListInput
                label="Password"
                type="password"
                required
                validate
                placeholder="***********"
                value = {password}
                onInput={(e) => {
                  setPassword(e.target.value);
                }}
            />
            <ListInput
                label="First Name"
                type="text"
                required
                validate
                placeholder="Your Frist Name"
                value = {firstName}
                onInput={(e) => {
                  setFirstName(e.target.value);
                }}
            />
            <ListInput
                label="Last Name"
                type="text"
                required
                validate
                placeholder="Your Last Name"
                value = {lastName}
                onInput={(e) => {
                  setLastName(e.target.value);
                }}
            />
            <ListInput
                label="Pseudo"
                type="text"
                required
                validate
                placeholder="Your Pseudo"
                value = {pseudo}
                onInput={(e) => {
                setPseudo(e.target.value);
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
                value = {birthdate}
                onCalendarChange={(e) => {
                  setBirthdate(e);
                }}
            />
          <Block>
            <ListButton onClick={()=>signup()}>Sign Up</ListButton>
            <BlockFooter>
              <p>Already registered ?</p>
              <Link href="/" color="blue"> Sign In</Link>
            </BlockFooter>
          </Block>
        </List>
      </Page>
    );
  }
export default Signup