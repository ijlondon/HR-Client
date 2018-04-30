import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { getCurrentUser, handleLogin, handleLogout } from './UserService';
import './Login.css';


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
        <button onClick={handleLogout} className="LogBTN"> Logout </button>
      )
    } else {
      return (
        <GoogleLogin
          clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleLogin}
          onFailure={this.responseGoogle}
          className="LogBTN"
        />
      );
    }
  }
}
