import React, { Fragment } from 'react';
import Layout from '../components/layout';
import { Link } from 'gatsby';
import { navigate } from 'gatsby';
import * as ROUTES from '../constants/routes';
import styled from 'styled-components';
// import * as ROLES from '../constants/roles';

// import { AuthUserContext } from '../Session';
// import SignOutButton from '../SignOut';

const Button = styled.div`
  background-color: white;
  width: 20vw;
  border: 0.01em solid;
  height: 10vh;
  text-align: center;
  display: inline-block;
  margin: 20px;
`;
const ButtonContainer = styled.div`
  background-color: green;
  text-align: center;
`;
const BannerContainer = styled.div`
  text-align: center;
  background-color: red;
`;
const BannerImage = styled.div`
  display: inline-block;
  height: 35vh;
  width: auto;
`;
const Title = styled.div`
  font-size: 30px;
  font-family: Raleway;
`;

const LandingPage = () => (
  <Fragment>
    <BannerContainer>
      <Title>
        Messages <br />
        From
        <br />Strangers
      </Title>
      <BannerImage as="img" src="/images/banner-homepage.png" />
    </BannerContainer>
    <ButtonContainer>
      <Button
        onClick={() => {
          navigate(ROUTES.SIGN_UP);
        }}
      >
        Sign up
      </Button>
      <Button
        onClick={() => {
          navigate(ROUTES.SIGN_IN);
        }}
      >
        Sign in
      </Button>
    </ButtonContainer>
  </Fragment>
);

export default () => (
  <Layout>
    <LandingPage />
  </Layout>
);
