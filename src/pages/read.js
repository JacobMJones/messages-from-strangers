import React from 'react';
import { navigate } from 'gatsby';
import { compose } from 'recompose';
import SignOutButton from '../components/SignOut';
import Layout from '../components/layout';
import {
  withAuthorization,
  // withEmailVerification,
} from '../components/Session';

import FindMessage from '../components/FindMessage';
import * as ROUTES from '../constants/routes';
import styled from 'styled-components';

const Button = styled.div`

height:10vh;
width:20vw;
`

const ReadPageBase = () => (
  <div>
 Read.
    {/* <p style={{fontFamily:'Raleway', fontSize:'2.5em'}}>Mama! Papa! I'm home.</p>
    
    <FindMessage />
    <Button as='button' onClick={()=>{navigate(ROUTES.MY_MESSAGES)}}>My Messages</Button><br/>
    <Button as='button'>My Conversations</Button><br/>
    <Button as='button'>Account Stuff</Button> */}
   <FindMessage/>
  </div>
);

const condition = authUser => !!authUser;

const ReadPage = compose(withAuthorization(condition))(ReadPageBase);

export default () => (
  <Layout>
      
    <ReadPage />
    {/* <Messages /> */}
  
   
   
  
    <br/><br/>
    <SignOutButton />
  </Layout>
);
