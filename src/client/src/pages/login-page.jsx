import React, {useEffect, useState} from 'react';
import{Page, LoginScreenTitle, List, ListInput, ListButton, BlockFooter, Link, Block, f7} from 'framework7-react';
import API from '../utils/API'
import {useSelector, useDispatch} from 'react-redux'
import {updateUser} from '../actions'

const Login = () => {
  
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [validated, useValidated] = useState(false);
  const signIn= async() => {
    const app = f7;
    const router = app.views.main.router;
    const dispatch = useDispatch();
    if (validated&&password&&email){
        try{
            const {status, data} = await API.login(self.state.email,self.state.password)
            if (status===200){
              dispatch(updateUser(data)),
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
  return (
    <Page noToolbar noNavbar noSwipeback loginScreen>
      <LoginScreenTitle>FriendFinder</LoginScreenTitle>
      <List form>
        <ListInput
          label="Email"
          type="email"
          required
          validate
          onValidate={(isValid) => useValidated(true)}
          placeholder="example@example.com"
          value={email}
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
          value={password}
          onInput={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Block>
          <ListButton onClick={()=>signIn()}>Sign In</ListButton>
          <BlockFooter>
            <p>Not registered yet ?</p>
            <Link href="/signup/" color="blue"> Sign Up</Link>
          </BlockFooter>
        </Block>
      </List>
    </Page>
  );
}
export default Login
