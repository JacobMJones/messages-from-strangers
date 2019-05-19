import React, { Fragment, Component } from 'react';
import Layout from '../components/layout';
import { navigate } from 'gatsby';
import * as ROUTES from '../constants/routes';
import styled from 'styled-components';
import device from '../constants/devices.js'

const Button = styled.div`
  border-radius: 4px;
  background-color: white;
  border: solid 1px;
  color: black;
  text-align: center;
  font-family: Raleway;
  font-size: 28px;
  padding: 20px;
  width: 200px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
  display: inline-block;
`;
const ButtonContainer = styled.div`
  text-align: center;
`;
const BannerContainer = styled.div`
  @media ${device.mobile} {
    margin-top: 2vh;
  }
  @media ${device.laptop} {
    margin-top: 12vh;
  }
  text-align: center;
`;
const BannerImage = styled.div`
  display: inline-block;
  height: 35vh;
  width: auto;
`;
const Title = styled.div`
  font-size: 2.5rem;
  font-family: Raleway;
`;

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { canRender: false };
  }
  componentDidMount() {
    this.setState({ canRender: true });
  }
  render() {
    console.log('hello', device);
    return (
      <Fragment>
        {this.state.canRender && (
          <Fragment>
            <BannerContainer>
              <Title>
                Messages <br />
                From
                <br />
                Strangers
              </Title>
              <BannerImage
                as="img"
                src="/images/banner-homepage.png"
              />
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
        )}
      </Fragment>
    );
  }
}

export default () => (
  <Layout>
    <LandingPage />
  </Layout>
);
