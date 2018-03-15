import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import Auth0 from '../../helpers/auth0';
import Firebase from '../../helpers/firebase';
import FirebaseLogin from '../../components/firebase';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';

const { login } = authAction;

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    email: '',
    password: '',
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = (e) => {
    const { login } = this.props;
    const { email, password } = this.state;
    login({ email, password, provider: e.target.id });
    //this.props.history.push('/dashboard');
  };
  render() {
    const from = { pathname: '/dashboard' };
    const { redirectToReferrer } = this.state;
    const { idToken, error } = this.props.auth;
    if (redirectToReferrer || idToken) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>

            <div className="isoSignInForm">
              {/*
              <div className="isoInputWrapper">
                <Input 
                  size="large" 
                  placeholder="Email" 
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                />
              </div>

              <div className="isoInputWrapper">
                <Input 
                  size="large" 
                  type="password" 
                  placeholder="Password" 
                  value={this.state.password}
                  onChange={event => this.setState({ password: event.target.value })}
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
                <Button id={Firebase.EMAIL} onClick={this.handleLogin} type="primary">
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>
              */}

              <div className="isoInputWrapper isoOtherLogin">
                { error ?
                  <p className="isoHelperText">
                    { error.message }
                    {/*<IntlMessages id="page.signInPreview" />*/}
                  </p> : '' }

                <Button id={Firebase.FACEBOOK} onClick={this.handleLogin} type="primary btnFacebook">
                  <IntlMessages id="page.signInFacebook" />
                </Button>
                <Button id={Firebase.TWITTER} onClick={this.handleLogin} type="primary btnTwitter">
                  <IntlMessages id="page.signInTwitter" />
                </Button>
                <Button id={Firebase.GOOGLE} onClick={this.handleLogin} type="primary btnGooglePlus">
                  <IntlMessages id="page.signInGooglePlus" />
                </Button>

                {/* Auth0.isValid &&
                  <Button
                    onClick={() => {
                      Auth0.login(this.handleLogin);
                    }}
                    type="primary btnAuthZero"
                  >
                    <IntlMessages id="page.signInAuth0" />
                  </Button> */}

                {/* Firebase.isValid && <FirebaseLogin login={this.handleLogin} /> */}
              </div>

              {/*
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/forgotpassword" className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </Link>
                <Link to="/signup">
                  <IntlMessages id="page.signInCreateAccount" />
                </Link>
              </div>
              */}
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    auth: state.Auth.toJS()
  }),
  { login }
)(SignIn);
