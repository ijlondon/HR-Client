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
    ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col} from 'reactstrap';
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
            <Media query="(min-width: 371px)">
                <Navbar color="faded" light expand="md">



                    <NavbarBrand href="/Home">
                        <img src={logo} style={{width:60, marginTop: -7, padding:'5px'}} />
                        HR
                    </NavbarBrand>

                    <div className="userNameStyle1" >

                        {getCurrentUser() ? getCurrentUser().w3.ig : ''}

                        <Login/>
                    </div>

                </Navbar>
            </Media>

            <Media query="(max-width: 370px) ">
                <Navbar color="faded" light expand="md">



                    <NavbarBrand href="/Home">
                        <img src={logo} style={{width:60, marginTop: -7, padding:'5px'}} />
                    </NavbarBrand>

                    <div className="userNameStyle1" >

                        {getCurrentUser() ? getCurrentUser().w3.ig : ''}

                        <Login/>
                    </div>

                </Navbar>
            </Media>



          <div className="buttonGRP">
          <Media query="(min-width: 920px)">
             <div className="buttonGRPL">
              <ButtonGroup size="lg">
                  <Button href="/Home">Find an Employee</Button>
                  <Button href="/Departments">Departments</Button>
                  <Button href="/Profile">Profile</Button>
              </ButtonGroup>
             </div>
          </Media>

              <Media query="(max-width: 919px)">
                      <ButtonGroup size="lg" vertical ="true" className="bttnGRPSM"  style={{display: 'flex', justifyContent: 'center'}} >

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
