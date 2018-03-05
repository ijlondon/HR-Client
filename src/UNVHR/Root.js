import React from 'react';
import {Header} from "./Header";
import {Footer} from "./Footer";
import './Root.css';




export class Root extends React.Component{
  render(){
    return (
        <div className="main-container" >
                <Header/>
                {this.props.children}
                <Footer/>
        </div>
             
    );
  }
};