import React from 'react';
import './LoginPrompt.css';


export class LoginPrompt extends React.Component{
  render() {
    return (
      <div className="parent" >
        <h1>Log In</h1>
        <text >Please log in before using the HR System </text>
      </div>
    );
  }
}
