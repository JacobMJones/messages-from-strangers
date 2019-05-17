import React, { Fragment } from 'react';
import Layout from '../components/layout';
import { Link } from 'gatsby';
import { navigate } from 'gatsby';
import * as ROUTES from '../constants/routes';
import styled from "styled-components"
// import * as ROLES from '../constants/roles';

// import { AuthUserContext } from '../Session';
// import SignOutButton from '../SignOut';

const Container = styled.div`
  margin: 3rem auto;
  max-width: 600px;
  background-color:green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const LandingPage = () => (
  <Container>
    <img style={{height:'45vh', width:'auto'}}src="/images/banner-homepage.png"/>
    <br/>
    <div>
    <button style={{backgroundColor:'white', width:'20vw', height:'8vh', border:"0.01em solid", fontSize:"16px" }} onClick={()=>{navigate(ROUTES.SIGN_UP)}}>Sign up</button>
    {/* <Link to={ROUTES.SIGN_UP}>Sign Up</Link> */}
    <br /><br/>
    <button style={{backgroundColor:'white', width:'20vw', height:'8vh', border:"0.01em solid", fontSize:"16px" }} onClick={()=>{navigate(ROUTES.SIGN_IN)}}>Sign in</button>
  
    </div>
  </Container>
);

export default () => (
  <Layout>
    <LandingPage />
  </Layout>
);


