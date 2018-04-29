import React from 'react';
import Media from "react-media";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';
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
            <Media query="(min-width: 920px)">
          <Navbar color="faded" light expand="md">



             <NavbarBrand href="/Home">
                
                <img src={logo} style={{width:60, marginTop: -7, padding:'5px'}} />
                Human Resources 
            </NavbarBrand>

              <NavItem><SearchBox className="SearchBox" /></NavItem>
            
              <NavItem><div className="userNameStyle1" >
            
              {getCurrentUser() ? 'Hello, ' + getCurrentUser().w3.ig : ''}

              <Login/>
              </div></NavItem>
<br/>

          </Navbar>
            </Media>

            <Media query="(max-width: 919px)">
                <Navbar color="faded" light expand="md">



                    <NavbarBrand href="/Home">
                        <img src={logo} style={{width:60, marginTop: -7, padding:'5px'}} />
                    </NavbarBrand>

                    <SearchBox className="SearchBox" style={{width: 30}} />

                    <div className="userNameStyle1" >

                        {getCurrentUser() ? 'Hello, ' + getCurrentUser().w3.ig : ''}

                        <Login/>
                    </div>

                </Navbar>
            </Media>

          <div className="buttonGRP">
          <Media query="(min-width: 600px)">
              <ButtonGroup size="lg" justified="true">
                  <Button href="/Home">Find an Employee</Button>
                  <Button href="/Departments">Departments</Button>
                  <Button href="/Profile">Profile</Button>
              </ButtonGroup>
          </Media>

              <Media query="(max-width: 599px)">
                  <ButtonGroup size="lg" vertical block="true" className="bttnGRPSM">

                      <Button href="/Home">Find an Employee</Button>
                      <Button href="/Departments">Departments</Button>
                      <Button href="/Profile">Profile</Button>

              </ButtonGroup>
              </Media>
          </div>       
          
        </div>
      );
    }
  }
