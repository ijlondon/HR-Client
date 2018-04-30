import React from 'react';
import './LoginPrompt.css';



export class LoginPrompt extends React.Component{
  render() {
    return (
      <div className="wrapper">
      <div className="findCard" >
        <h1 style={{color: "#f36e21"}} >Log In</h1>
        <p>Please log in before using the HR System</p>
      </div>
      </div>
    );
  }
}
