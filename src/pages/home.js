import React from 'react';
import { navigate } from 'gatsby';
import { compose } from 'recompose';
import SignOutButton from '../components/SignOut';
import Layout from '../components/layout';
import {
  withAuthorization,
  // withEmailVerification,
} from '../components/Session';
import Messages from '../components/Messages';
import FindMessage from '../components/FindMessage';
import * as ROUTES from '../constants/routes';
const HomePageBase = () => (
  <div>
 
    <p style={{fontFamily:'Raleway', fontSize:'2.5em'}}>This is your homepage</p>
    
  </div>
);

const condition = authUser => !!authUser;

const HomePage = compose(withAuthorization(condition))(HomePageBase);

export default () => (
  <Layout>
    <HomePage />
    {/* <Messages /> */}
    <button style={{marginBottom:'15vh'}} onClick={()=>{navigate(ROUTES.MY_MESSAGES)}}>My Messages</button>
   
   
    <FindMessage />
    <br/><br/>
    <SignOutButton />
  </Layout>
);
