import React, {useEffect, useState} from 'react';
import{Page, LoginScreenTitle, List, ListInput, ListButton, BlockFooter, Link, Block, f7} from 'framework7-react';
import API from '../utils/API'
import {useSelector, useDispatch} from 'react-redux'
import {updateUser, signIn} from '../actions'

const Login = () => {
  
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [validated, useValidated] = useState(false);
  const dispatch = useDispatch();
  function actionCreator(payload) {
    return dispatch => {
        dispatch(updateUser(payload.user))
        dispatch(signIn(payload.token))
    }
}

  const signIn= async() => {
    const app = f7;
    const router = app.views.main.router;
    
    if (validated&&password&&email){
        try{
            //const {status, data} = 
            await API.login(email,password).then((res)=>{
            if (res.status===200){  
              actionCreator(res.data.msg);                            
              localStorage.setItem("token", res.data.msg.token)
            }});
            router.navigate('/', {reloadCurrent:true});
            // console.log(data);
            // if (status===200){
            //   dispatch(updateUser(data.msg.user));
            //   dispatch(signIn(data.msg.token));                                 
            //   localStorage.setItem("token", data.msg.token)
            //   console.log("error");
            //   router.navigate('/', {reloadCurrent:true});
            // }
        }
        catch(error){
            console.log(error);
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
