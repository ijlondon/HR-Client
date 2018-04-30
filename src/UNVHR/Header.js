import React from 'react';
import {
  Button,
  ButtonGroup,
  Navbar,
  NavbarBrand} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';
import {getCurrentUser} from './UserService';
import {SearchBox} from './SearchBox';
import {Login} from './Login';
import './Header.css';
import { getCurrentUserInfo } from './ApiConnector';




  export class Header extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        userIsAdmin: false,
        userIsLoggedIn: !!getCurrentUser()
      }
    }

    componentDidMount() {
      if (this.state.userIsLoggedIn) {
        getCurrentUserInfo().then(data =>{
          this.setState({userIsAdmin: data.data.admin})
        })
      }
    }

    render() {
      return (
        <div>
          <Navbar color="faded" light expand="md">
             <NavbarBrand href="/">
                <img alt="RIT Logo" src={logo} style={{width:60, marginTop: -7, padding:'5px'}} />
                Human Resources 
            </NavbarBrand>

            {this.state.userIsLoggedIn ? <SearchBox className="SearchBox" /> : ''}
            <div className="userNameStyle1">
              {this.state.userIsLoggedIn ? 'Hello, ' + getCurrentUser().w3.ig : ''}
              <Login/>
            </div>
          </Navbar>

          <div className="buttonGRP">
          {this.state.userIsLoggedIn ? 
            <ButtonGroup size="lg">
              <Button href="/Home">Find an Employee</Button>
              {this.state.userIsAdmin ? <Button href="/Departments">Departments</Button> : '' }
              <Button href="/Profile">Profile</Button>
            </ButtonGroup> : 
          ''}
          
          </div>       
          
        </div>
      );
    }
  }
