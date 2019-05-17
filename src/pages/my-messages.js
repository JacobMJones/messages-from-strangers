import React from 'react';
import { compose } from 'recompose';
import SignOutButton from '../components/SignOut';
import Layout from '../components/layout';
import { navigate } from 'gatsby';
import * as ROUTES from '../constants/routes';
import {
  withAuthorization,
  // withEmailVerification,
} from '../components/Session';
import Messages from '../components/MyMessages';
import FindMessage from '../components/FindMessage';
const MyMessagesBase = () => (
  <div>
    <h1 style={{fontFamily:'Raleway', fontSize:'2em'}}>My Messages</h1>
    <br/><br/>
  </div>
);

const condition = authUser => !!authUser;

const MyMessages = compose(withAuthorization(condition))(MyMessagesBase);

export default () => (
  <Layout>
    <MyMessages />
     <Messages />
   {/* <SignOutButton />
    <br/><br/><br/><br/><br/>
    <FindMessage /> */}
       <button onClick={()=>{navigate(ROUTES.HOME)}}>Home</button>
  </Layout>
);
