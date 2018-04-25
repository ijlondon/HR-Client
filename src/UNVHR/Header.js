import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router';
import logo from './logo.png';
import {getCurrentUser} from './UserService';
import {SearchBox} from './SearchBox';
import {Login} from './Login';
import './Header.css';
import { Button, ButtonGroup } from 'reactstrap';




  export class Header extends React.Component {
    
    render() {
      return (
        <div>
          <Navbar id={navbar} color="faded" light expand="md">

            

             <NavbarBrand href="/Home">
                
                <img src={logo} style={{width:60, marginTop: -7, padding:'5px'}} />
                Human Resources 
            </NavbarBrand>

            <SearchBox className="SearchBox" />  

            
            
            <div className="userNameStyle1">
            
              {getCurrentUser() ? 'Hello, ' + getCurrentUser().w3.ig : ''}

              <Login/>
            </div>     


          </Navbar>

          <div className="buttonGRP">
          <ButtonGroup size="lg">
            <Button href="/Home">Find an Employee</Button>
            <Button href="/Departments">Departments</Button>
            <Button href="/Profile">Profile</Button>
          </ButtonGroup>
          </div>       
          
        </div>
      );
    }
  }
