import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { getUser } from './ApiConnector';
import './Profile.css';

export class Profile extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user: {
        address: {}
      },
      employees: [],
      disabled: true,
      salary_estimate: 0,
      buttonLabel: "Edit" // inital state
    }
    this.enableEdit = this.enableEdit.bind(this);
  }

  componentDidMount() {
    this.editButton = ReactDOM.findDOMNode(this.refs.editButton);
    getUser('1')
    .then(data => {
      let user = data.data;
      this.setState({
        user: user,
        employees: user.workers,
      });
      // let salary_estimate = this.state.salary_estimate
      this.getSalary()
      console.log("state", this.state);
    });
  }

  getSalary() {
    let user = this.state.user
    // Uncomment line below for working example
    // user.jobTitle = "Computer Programmers"
    var url = 'https://data.ny.gov/resource/tn4j-d3nf.json?area=36&occupational_title=' + user.jobTitle
    // If user has a null jobTitle, allow html placeholder to fill instead of API
    if (user.jobTitle == null) {
      return;
    }
    fetch(url).then( result => {
      return result.json();
    }).then( res => {
        var sal = 1000000
        // If API returns successfully, overwrite default value with result
        if (res.length != 0) {
          sal = Number(res[0].mean);
        }
        // Format salary to be readable
        sal = sal.toLocaleString()
        sal = "$" + sal + ".00"
        this.setState({ salary_estimate: sal })
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
                    <input className="inputField" type="text" name="lname" value={this.state.user.salary} placeholder="$1,000,000.00" disabled />
                  </div>
                  <div className="infoStyle" >
                    <label className="label" > Salary Estimate </label>
                    <input className="inputField" type="text" name="lname" value={this.state.salary_estimate} placeholder="$1,000,000.00" disabled />
                  </div>
                  <a href="https://www.its.ny.gov">Powered by <img className="nyIMG"  src="https://data.ny.gov/api/assets/24867D9C-004D-4A57-80CA-6757C009D140"></img></a>
                </div>
              </div>
              <div className="alignMe" >
                <div className="headerStyle" >
                  Employees
                </div>
                <div className="infoCard">
                  {this.state.employees.map(employee => { return(
                    <div className="employeeCard" >
                      <img className="employeeAvatar" src={require('./profile.png')} />
                      <p className="employeeName" >{employee.firstName} {employee.lastName}</p>
                      <Link to={`/Employee/${employee.id}`}>
                        <button className="viewButton">
                          View Profile
                        </button>
                      </Link>
                    </div>
                  )})}
                </div>
              </div>
            </div>
          </div>
    );
  }
};
