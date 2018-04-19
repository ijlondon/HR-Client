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


  export class Header extends React.Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <div>
          <Navbar color="faded" light expand="md">

            

             <NavbarBrand href="/Home">
                
                <img src={logo} style={{width:60, marginTop: -7, padding:'5px'}} />
                Human Resources 
            </NavbarBrand>

                    

            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              <NavItem>
              <SearchBox className="SearchBox" />
                </NavItem>
                <NavItem>
                  <NavLink href="/Home">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Departments">Departments</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/Profile">Profile</NavLink>
                </NavItem>
                <NavItem>
                <NavLink className="userNameStyle"><div className="userNameStyle1">{getCurrentUser() ? 'Hello, ' + getCurrentUser().w3.ig : ''}</div></NavLink>

                </NavItem>
                <NavItem>
                  <NavLink><Login /></NavLink>

                </NavItem>
                
              </Nav>
            </Collapse>

            <NavbarToggler onClick={this.toggle} />

          </Navbar>

          
          
        </div>
      );
    }
  }
