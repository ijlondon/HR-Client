import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { getCurrentUser, handleLogin, handleLogout } from './UserService';

export class Login extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: getCurrentUser() ? true : false,
    }
    this.responseGoogle = this.responseGoogle.bind(this);
  }
  responseGoogle(response) {
    console.log(response);
  }
  render() {
    if (this.state.loggedIn) {
      return (
        <GoogleLogout
          buttonText="Logout"
          onLogoutSuccess={handleLogout}
        >
        </GoogleLogout>
      )
    } else {
      return (
        <GoogleLogin
          clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={this.responseGoogle}
        />
      );
    }
  }
}
