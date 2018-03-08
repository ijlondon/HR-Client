import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { getUser, editEmployee } from './ApiConnector';
import './Profile.css';

export class Employee extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      employees: [],
      disabled: true,
      buttonLabel: "Edit" // inital state
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
        label: 'Email',
        field: 'email',
      },
      {
        label: 'Phone',
        field: 'telephone',
      },
    ];
    
    this.workFields = [
      {
        label: 'Job Title',
        field: 'jobTitle',
      },
      {
        label: 'Department',
        field: 'department',
      },
      {
        label: 'Salary',
        field: 'salary',
      },
    ];

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const user = this.state.user;
    user[name] = value;

    this.setState({ user: user });
  }

  componentDidMount() {
    this.editButton = ReactDOM.findDOMNode(this.refs.editButton);  
    this.updateUser();  
  }

  componentDidUpdate() {
    this.updateUser();
  }

  updateUser() {
    if (!this.state.user.id || this.props.params['employeeId'] !== this.state.user.id) {
      getUser(this.props.params['employeeId'])
      .then(data => {
        let user = data.data;
        this.setState({
          user: user,
          employees: user.workers,
        });
        console.log("state", this.state);
      });
    }
  }

  toggleEdit() {
    if (!this.state.disabled) {
      editEmployee(this.state.user)
      .then(response => console.log(response));
    }
    this.setState({
      disabled: !this.state.disabled,
      buttonLabel: !this.state.disabled ? "Edit": "Save" // update it here
    });
  }

  render(){
    return (
        <div className="wrapProfile" >
            <div>
              <div><img  className="photoStyle" src={require('./profile.png')} />
              </div>
              <div className="headerStyle" >
                {this.state.user.firstName}'s Personal Information
                <button className="editButton" onClick = {this.toggleEdit}>
                  {this.state.buttonLabel}
                </button>
              </div>
              <div className="infoCard" >
                {this.personalFields.map(field => { return(
                  <div className="infoStyle" >
                    <label className="label" > {field.label} </label>
                    <input className="inputField" type="text" name={field.field} value={this.state.user[field.field]} disabled={(this.state.disabled)? "disabled" : ""} onChange={this.handleChange}/> 
                  </div>
                )})}
              </div>
              <div className="alignMe" >
                <div className="headerStyle" >
                  {this.state.user.firstName}'s Work Information
                </div>
                <div className="infoCard" >
                {this.workFields.map(field => { return(
                  <div className="infoStyle" >
                    <label className="label" > {field.label} </label>
                    <input className="inputField" type="text" name={field.field} value={this.state.user[field.field]} disabled={(this.state.disabled)? "disabled" : ""} onChange={this.handleChange}/> 
                  </div>
                )})}
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
}