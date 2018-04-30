import React from 'react';
import Media from "react-media";
import {
  Button,
  ButtonGroup,
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
          <Media query="(min-width: 920px)">
          
          <Navbar color="faded" light expand="md">
            <NavItem>
              <NavbarBrand href="/">
                <img alt="RIT Logo" src={logo} style={{width:60, marginTop: -7, padding:'5px'}} />
                Human Resources 
              </NavbarBrand>
            </NavItem>
            {this.state.userIsLoggedIn ? <SearchBox className="SearchBox" /> : ''}
            <div className="userNameStyle1">
              {this.state.userIsLoggedIn ? 'Hello, ' + getCurrentUser().w3.ig : ''}
              <Login/>
            </div>
          </Navbar>

          </Media>

            <Media query="(max-width: 919px)">
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



          <div className="buttonGRP">
          <Media query="(min-width: 920px)">
             <div className="buttonGRPL">
                {this.state.userIsLoggedIn ? 
                  <ButtonGroup size="lg">
                    <Button href="/Home">Find an Employee</Button>
                    {this.state.userIsAdmin ? <Button href="/Departments">Departments</Button> : '' }
                    <Button href="/Profile">Profile</Button>
                  </ButtonGroup> : 
                ''}
             </div>
          </Media>

              <Media query="(max-width: 919px)">
                      
                {this.state.userIsLoggedIn ? 
                  <ButtonGroup size="lg" vertical ="true" className="bttnGRPSM"  style={{display: 'flex', justifyContent: 'center'}} >
                    <Button href="/Home">Find an Employee</Button>
                    {this.state.userIsAdmin ? <Button href="/Departments">Departments</Button> : '' }
                    <Button href="/Profile">Profile</Button>
                  </ButtonGroup> : 
                ''}

              </Media>
          </div>

        </div>
      );
    }
  }
