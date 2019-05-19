import React from 'react';
import { navigate } from 'gatsby';
import { compose } from 'recompose';
import Layout from '../components/layout';
import { withAuthorization } from '../components/Session';
import { withFirebase } from '../components/Firebase';
import * as ROUTES from '../constants/routes';
import styled from 'styled-components';

const Button = styled.div`
  height: 100%;
  width: 100%;
  font-family: Raleway;
  font-size: 4em;
`;

const OutterContainer = styled.div`
  height: 90vh;
 
  width: 100vw;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
`;
const InnerContainer = styled.div`
  height: ${props => props.height && props.height}%;
  width: 90%;
  margin: 2vh;
  display: inline-block;
`;

const UtilityIcon = styled.div`
height:100px;
width:auto;
margin:20px;
flex:1;
width:auto;
`;
const UtilityIconContainer = styled.div`
  height: 100%;
  display: flex;
`;

const HomePageBase  = ({ firebase }) => (
  <OutterContainer>
    <InnerContainer height={35}>
      <Button
        as="button"
        onClick={() => {
          navigate(ROUTES.READ);
        }}
      >
        Read.
      </Button>
    </InnerContainer>
    <InnerContainer height={35}>
      <Button
        as="button"
        onClick={() => {
          navigate(ROUTES.WRITE);
        }}
      >
        Write.
      </Button>
    </InnerContainer>
    <InnerContainer height={20}>
      <UtilityIconContainer>
        <UtilityIcon
          as="img"
          src="/images/user-icon.png"
          onClick={() => {
            navigate(ROUTES.ACCOUNT);
          }}
        />
        <UtilityIcon
          as="img"
          src="/images/door.png"
          onClick={() => {
            firebase.doSignOut();
          }}
        />
      </UtilityIconContainer>
    </InnerContainer>
  </OutterContainer>
);

const condition = authUser => !!authUser;
const HomePage = compose(withAuthorization(condition))(
  withFirebase(HomePageBase),
);

export default () => (
  <Layout>
    <HomePage />
  </Layout>
);
