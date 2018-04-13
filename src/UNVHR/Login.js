import React from 'react';
import { GoogleLogin } from 'react-google-login';


export class Login extends React.Component{
  constructor(props) {
    super(props)
    this.responseGoogle = this.responseGoogle.bind(this);
  }
  responseGoogle(response) {
    console.log(response);
  }
  render(){
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    );
  }
}
