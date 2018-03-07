import React from 'react';
import ReactDOM from 'react-dom';
import { getUser } from './ApiConnector';
import './Profile.css';

export class Profile extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user: {
        address: {}
      },
      disabled: true,
      buttonLabel: "Edit" // inital state
    }
    this.enableEdit = this.enableEdit.bind(this);
  }

  componentDidMount() {
    this.editButton = ReactDOM.findDOMNode(this.refs.editButton);
    getUser('1')
    .then(data => {
      let user = data.data;
      this.setState({user: user});
      console.log("state", this.state);
    });
  }

  enableEdit() {
    this.setState({
      disabled: !this.state.disabled,
      buttonLabel:"Save" // update it here
    })
  }

  render(){
    return (
        <div className="wrapProfile" >
            <div>
              <div><img  className="photoStyle" src={require('./profile.png')} />
              </div>
              <div className="headerStyle" >
                Your Personal Information
                <button className="editButton" onClick = {this.enableEdit}>
                  {this.state.buttonLabel}
                </button>
              </div>
              <div className="infoCard" >
              <div className="infoStyle" > 
                  <label className="label" > First Name </label>
                  <input className="inputField" type="text" name="fname" value={this.state.user.firstName} disabled = {(this.state.disabled)? "disabled" : ""}/> 
                </div>
                <div className="infoStyle" > 
                  <label className="label" > Last Name </label>
                  <input className="inputField" type="text" name="lname" value={this.state.user.lastName} disabled = {(this.state.disabled)? "disabled" : ""}/> 
                </div>
                <div className="infoStyle" > 
                  <label className="label" > Address </label> 
                  <input className="inputField" type="text" name="address" value={this.state.user.address.street} placeholder="1 Lomb Memorial Dr, Rochester, NY 14623" disabled = {(this.state.disabled)? "disabled" : ""}/> 
                </div>
                <div className="infoStyle" > 
                  <label className="label" > Email </label> 
                  <input className="inputField" type="text" name="email" value={this.state.user.email} placeholder="DanKrutz@krutz.com" disabled = {(this.state.disabled)? "disabled" : ""}/> 
                </div>
                <div className="infoStyle" > 
                  <label className="label" > Phone </label>
                  <input className="inputField" type="text" name="phone"  value={this.state.user.telephone} placeholder="(585)-123-4567" disabled = {(this.state.disabled)? "disabled" : ""}/> 
                </div>
              </div>
              <div className="alignMe" >
                <div className="headerStyle" >
                  Your Work Information
                </div>
                <div className="infoCard" >
                  <div className="infoStyle" > 
                    <label className="label" > Job Title </label>
                    <input className="inputField" type="text" name="lname" placeholder="Assistant Professor" disabled /> 
                  </div>
                  <div className="infoStyle" > 
                    <label className="label" > Department </label> 
                    <input className="inputField" type="text" name="lname" placeholder="Software Engineering" disabled /> 
                  </div>
                  <div className="infoStyle" > 
                    <label className="label" > Salary </label> 
                    <input className="inputField" type="text" name="lname" value={this.state.user.salary} placeholder="$1,000,000,000 per year" disabled /> 
                  </div>
                </div>
              </div>
              <div className="alignMe" >
                <div className="headerStyle" >
                  Employees that report to you
                </div>
                <div className="employeeCard" >
                <div><img  style={{width:'120px', height:'120px', margin: 'auto',  display:'block'}} src={require('./profile.png')} />
                <p className="employeeName" >Andy Meneely</p>
                <button className="viewButton">
                  View Profile
                </button>
                </div>
                </div>
                <div className="employeeCard" >
                <div><img  style={{width:'120px', height:'120px', margin: 'auto',  display:'block'}} src={require('./profile.png')} />
                <p className="employeeName" >Andy Meneely</p>
                <button className="viewButton">
                  View Profile
                </button>
                </div>
                </div>
                <div className="employeeCard" >
                <div><img  style={{width:'120px', height:'120px', margin: 'auto',  display:'block'}} src={require('./profile.png')} />
                <p className="employeeName" >Andy Meneely</p>
                <button className="viewButton">
                  View Profile
                </button>
                </div>
                </div>
              </div>
            </div>
          </div>
    );
  }
};