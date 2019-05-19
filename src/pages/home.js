import React from 'react';
import { navigate } from 'gatsby';
import { compose } from 'recompose';
import SignOutButton from '../components/SignOut';
import Layout from '../components/layout';
import { withAuthorization } from '../components/Session';

import * as ROUTES from '../constants/routes';
import styled from 'styled-components';

const Button = styled.div`
  height: 100%;
  width: 20vw;
`;

const OutterContainer = styled.div`
 
  background-color:brown;
  height:100vh;
  text-align:center;
  align-items:center;
  justify-content:center;
`;
const InnerContainer = styled.div`
 height:33%;
 width:100vw;
flex:1;
`;

const HomePageBase = () => (
  <OutterContainer>
    <InnerContainer style={{backgroundColor:'blue'}}>
      {/* <Button
        as="button"
        onClick={() => {
          navigate(ROUTES.READ);
        }}
      >
        Read
      </Button> */}
    </InnerContainer>
    <InnerContainer style={{backgroundColor:'red'}}>
      {/* <Button
        as="button"
        onClick={() => {
          navigate(ROUTES.WRITE);
        }}
      >
        Write.
      </Button> */}
    </InnerContainer>
    <InnerContainer style={{backgroundColor:'yellow'}}>
      {/* <Button
        as="button"
        onClick={() => {
          navigate(ROUTES.WRITE);
        }}
      >
        Write.
      </Button> */}
    </InnerContainer>

  </OutterContainer>
);

const condition = authUser => !!authUser;

const HomePage = compose(withAuthorization(condition))(HomePageBase);

export default () => (
  <Layout>
    <HomePage />
    <SignOutButton />
  </Layout>
);
