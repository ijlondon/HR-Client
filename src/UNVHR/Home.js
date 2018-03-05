import React from 'react';

import {SearchBox} from './SearchBox'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './Home.css';


export class Home extends React.Component{
  render(){
    return (
        <div className="wrapper" >
            <h1 className="welcomeText" >Welcome to HR System</h1>
            <div className="findCard" >
              <h2>Find an Employee</h2>
              <Select className="droplistStyle"
                 placeholder = "Choose a Department"
              /> 
              <Select className="droplistStyle"
                 placeholder = "Choose Employee Name"
              /> 

              <button className="searchButton" >
                Search
              </button>

            </div>
        </div>
             
    );
  }
};