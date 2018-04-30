import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { getCurrentUserInfo, editEmployee } from './ApiConnector';
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
      buttonLabel: "Edit" // initial state
    }

    this.personalFields = [
      {
        label: 'First Name',
        field: 'firstName',
      },
      {
        label: 'Last Name',
        field: 'lastName',
      },
      {
        label: 'Phone',
        field: 'telephone',
      },
    ];
    
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.editButton = ReactDOM.findDOMNode(this.refs.editButton);
    getCurrentUserInfo()
    .then(data => {
      let user = data.data;
      this.setState({
        user: user,
        employees: user.workers,
        departmentName: user.department.name,
        bossName: user.boss.firstName + ' ' + user.boss.lastName
      });
      this.getSalary()
      console.log("state", this.state);
    });
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const user = this.state.user;
    user[name] = value;

    this.setState({ user: user });
  }

  getSalary() {
    let user = this.state.user
    // Query salary api
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
        if (res.length !== 0) {
          sal = Number(res[0].mean);
        }
        // Format salary to be readable
        sal = sal.toLocaleString()
        sal = "$" + sal + ".00"
        this.setState({ salary_estimate: sal })
      });
  }

  toggleEdit() {
    if (this.state.buttonLabel === "Save") {
      editEmployee(this.state.user);
    }
    this.setState({
      disabled: !this.state.disabled,
      buttonLabel: this.state.buttonLabel === "Edit" ? "Save" : "Edit" // update it here
    })
  }

  render(){
    return (
        <div className="wrapProfile" >
            <div>
              <div className="headerStyle" >
                Your Personal Information
                <button className="editButton" onClick = {this.toggleEdit}>
                  {this.state.buttonLabel}
                </button>
              </div>
              <div className="infoCard" >
                {this.personalFields.map(field => { return (
                  <div className="infoStyle" >
                    <label className="label" > {field.label} </label>
                    <input className="inputField" type="text" name={field.field} value={this.state.user[field.field]} onChange={this.handleChange} disabled = {(this.state.disabled)? "disabled" : ""}/>
                  </div>
                )})}
                <div className="infoStyle" >
                  <label className="label" > Email </label>
                  <div className="salaryEST" >{this.state.user.email}</div>
                </div>
              </div>
              <div className="alignMe" >
                <div className="headerStyle" >
                  Your Work Information
                </div>
                <div className="infoCard" >
                  <div className="infoStyle" >
                    <label className="label" > Job Title </label>
                    <div className="salaryEST" >{this.state.user.jobTitle}</div>
                  </div>
                  <div className="infoStyle" >
                    <label className="label" > Department </label>
                    <div className="salaryEST" > {this.state.departmentName} </div>
                  </div>
                  <div className="infoStyle" >
                    <label className="label" > Boss </label>
                    <div className="salaryEST" > {this.state.bossName || 'Not Applicable'} </div>
                  </div>
                  <div className="infoStyle" >
                    <label className="label" > Salary </label>
                    <div className="salaryEST" >{this.state.user.salary}</div>
                  </div>
                  <div className="infoStyle" >
                    <label className="label" > Salary Estimate </label>
                    <div className="salaryEST" >{this.state.salary_estimate}</div>
                  </div>
                  <a href="https://www.its.ny.gov">Powered by <img alt="New York State of Opportunity | Office of Information Technology Services" className="nyIMG"  src="https://data.ny.gov/api/assets/24867D9C-004D-4A57-80CA-6757C009D140"></img></a>
                </div>
              </div>
              <div className="alignMe" >
                <div className="headerStyle" >
                  Employees
                </div>
                <div className="infoCard">
                  {this.state.employees.map(employee => { return(
                    <div className="employeeCard" >
                      <img alt={employee.firstName + '\'s Profile'} className="employeeAvatar" src={require('./profile.png')} />
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
