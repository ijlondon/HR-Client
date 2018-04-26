import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import { Link } from 'react-router';
import { getUser, editEmployee, listDepartments, terminateEmployee} from './ApiConnector';
import JobList from './occupations.json';
import './Profile.css';

export class Employee extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      departments: [],
      jobs: [],
      user: {},
      employees: [],
      currentDepartment: null,
      currentJob: null,
      disabled: true,
      salary_estimate: 0,
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
    this.onDepartmentChange = this.onDepartmentChange.bind(this);
    this.onJobChange = this.onJobChange.bind(this);
    this.terminateUser = this.terminateUser.bind(this);
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

    listDepartments()
    .then(response => {
      const departments = response.data.map((department, index) => { return {
        label: department.name,
        value: index
      }});
      this.setState({ departments: departments });
      console.log("state", this.state);
    });

    const jobs = JobList.map((job, index) => { return {
      label: job.OccupationalTitle,
      value: job
    }});
    this.setState({ jobs: jobs });

    this.updateUser();
  }

  onDepartmentChange(value) {
    this.setState({
      currentDepartment: value.label
    })
  }

  onJobChange(value) {
    this.setState({
      currentJob: value.label
    })
  }

  getSalary() {
    let user = this.state.user
    // Uncomment line below for working example
    // user.jobTitle = "Computer Programmers"
    if (user.jobTitle == null) {
      return;
    }
    var url = 'https://data.ny.gov/resource/tn4j-d3nf.json?area=36&occupational_title=' + user.jobTitle
    // If user has a null jobTitle, allow html placeholder to fill instead of API
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

  componentDidUpdate() {
    this.updateUser();
  }

  updateUser() {
    // If no user is loaded or the wrong user is loaded, get the correct user
    if ((!this.state.user.id && this.state.user.id != 0) || this.props.params['employeeId'] !== this.state.user.id.toString()) {
      getUser(this.props.params['employeeId'])
      .then(data => {
        let user = data.data;
        this.setState({
          user: user,
          employees: user.workers,
        });
        this.getSalary();
        console.log("state", this.state);
      });
    }
  }

  terminateUser() {
    terminateEmployee(this.state.user)
      .then(console.log('user terminated'));
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
            <div>
                <img className="photoStyle" src={require('./profile.png')} />
            </div>
            <div className="headerStyle" >
              {this.state.user.firstName + "'s Personal Information" }
              <button className="trmButton" onClick={this.terminateUser}>Terminate</button>
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
                {this.state.user.firstName + "'s Work Information"}
              </div>
              <div className="infoCard" >
                <div className="infoStyle" >
                  <label className="label" > Job Title </label>
                  <Select className="selectField" JobTitle
                    placeholder = "Assistant Professor"
                    options={this.state.jobs}
                    onChange={this.onJobChange}
                    value={this.state.currentJob}
                    disabled={(this.state.disabled)? "disabled" : ""} ></Select>
                </div>
                <div className="infoStyle" >
                  <label className="label" > Department </label>
                  <Select className="selectField" Department
                    placeholder = "Software Engineering"
                    options={this.state.departments}
                    onChange={this.onDepartmentChange}
                    value={this.state.currentDepartment}
                    disabled={(this.state.disabled)? "disabled" : ""} ></Select>
                </div>
                <div className="infoStyle" >
                  <label className="label" > Salary </label>
                  <input className="inputField" type="text" name="lname" value={"$" + this.state.user.salary + ".00"} placeholder="$1,000,000.00" disabled />
                </div>
                <div className="infoStyle" >
                  <label className="label" > Salary Estimate </label>
                  <input className="inputField" type="text" name="lname" value={this.state.salary_estimate} placeholder="$1,000,000.00" disabled />
                </div>
                <a href="https://www.its.ny.gov">Powered by <img className="nyIMG"  src="https://data.ny.gov/api/assets/24867D9C-004D-4A57-80CA-6757C009D140"></img></a>
              </div>
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
    );
  }
}
