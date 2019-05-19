import React from 'react';
import { navigate } from 'gatsby';
import { compose } from 'recompose';
import SignOutButton from '../components/SignOut';
import Layout from '../components/layout';
import {
  withAuthorization,

} from '../components/Session';


import * as ROUTES from '../constants/routes';
import styled from 'styled-components';
import CreateMessage from '../components/CreateMessage'
import ReadMyMessages from '../components/ReadMyMessages'
const Button = styled.div`

height:10vh;
width:20vw;
`

const WritePageBase = () => (
  <div>
 Write.
    {/* <p style={{fontFamily:'Raleway', fontSize:'2.5em'}}>Mama! Papa! I'm home.</p>
    
    <FindMessage />
    <Button as='button' onClick={()=>{navigate(ROUTES.MY_MESSAGES)}}>My Messages</Button><br/>
    <Button as='button'>My Conversations</Button><br/>
    <Button as='button'>Account Stuff</Button> */}
   <CreateMessage/>
   <ReadMyMessages/>
     {/* <Messages /> */}
  </div>
);

const condition = authUser => !!authUser;

const WritePage = compose(withAuthorization(condition))(WritePageBase);

export default () => (
  <Layout>
      
    <WritePage />
    {/* <Messages /> */}
  
   
   
  
    <br/><br/>
    <SignOutButton />
  </Layout>
);
