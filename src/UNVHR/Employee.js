import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import { Link } from 'react-router';
import { getUser, editEmployee, listDepartments, listEmployees, terminateEmployee, canEditEmployee } from './ApiConnector';
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
      bosses: [],
      currentDepartment: null,
      currentJob: null,
      currentBoss: null,
      disabled: true,
      salary_estimate: 0,
      canEditUser: false,
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
      {
        label: 'Boss',
        field: 'boss',
      },
    ];

    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDepartmentChange = this.onDepartmentChange.bind(this);
    this.onJobChange = this.onJobChange.bind(this);
    this.onBossChange = this.onBossChange.bind(this);
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
    listDepartments()
    .then(response => {
      this.setState({ departments: response.data });
    });

    listEmployees()
    .then(response => {
      let bosses = response.data.map((boss) => {
        const name = boss.firstName + " " + boss.lastName;
        const id = boss.id;
        return { id, name }
        });
        bosses.sort((a, b) => a.id - b.id);
        bosses = bosses.filter(i => i.id != this.state.user.id);
      this.setState({ bosses: bosses });
    });

    const jobs = JobList.map(job => { return {
      label: job.OccupationalTitle,
      value: job
    }});
    this.setState({ jobs: jobs });
    this.updateUser();
  }

  onDepartmentChange(value) {
    this.setState({
      currentDepartment: value
    });
  }

  onJobChange(value) {
    this.setState({
      currentJob: value
    });
  }

  onBossChange(value) {
    this.setState({
      currentBoss: value
    });
  }

  getSalary() {
    let user = this.state.user
    // Check for jobTitle
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
        if (res.length) {
          sal = Number(res[0].mean);
        }
        // Format salary to be readable
        sal = sal.toLocaleString()
        sal = "$" + sal + ".00"
        this.setState({ salary_estimate: sal })
      });
  }

  prettySalary(sal) {
    sal = Number(sal);
    sal = sal.toLocaleString();
    sal = "$" + sal + ".00";
    return sal;
  }

  componentDidUpdate() {
    this.updateUser();
  }

  updateUser() {
    // If no user is loaded or the wrong user is loaded, get the correct user
    if ((!this.state.user.id && this.state.user.id !== 0) || this.props.params['employeeId'] !== this.state.user.id.toString()) {
      getUser(this.props.params['employeeId'])
      .then(data => {
        let user = data.data;
        let boss = user.boss;
        boss.name = (boss.firstName || 'Not') + " " + (boss.lastName || 'Applicable');
        this.setState({
          user: user,
          employees: user.workers,
          currentDepartment: user.department,
          currentJob: {label: user.jobTitle},
          currentBoss: boss,
        });
        this.getSalary();
        canEditEmployee(user.id)
        .then(data => {
          this.setState({canEditUser: data.data})
        });
      });
    }
  }

  terminateUser() {
    terminateEmployee(this.state.user)
    .then(window.location.replace("/Profile"));
  }

  refresh(){ 
    window.location.reload(); 
  }

  toggleEdit() {
    if (!this.state.disabled) {
      let newUser = this.state.user;
      newUser.department = this.state.currentDepartment;
      newUser.jobTitle = this.state.currentJob.label;
      newUser.boss.id = this.state.currentBoss.id;
      editEmployee(newUser)
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
            <div className="headerStyle" >
              {this.state.user.firstName + "'s Personal Information" }
              <button hidden={!this.state.canEditUser} id="editButton" className="editButton" onClick = {this.toggleEdit}>
                {this.state.buttonLabel}
              </button>
              <button hidden={!this.state.canEditUser | this.state.buttonLabel == "Edit"} type="reset" value="Reset" id="cancelButton" className="cancelButton" onClick={this.refresh}>Cancel</button>
            </div>
            <div className="infoCard" >
              {this.personalFields.map(field => { return(
              <div className="infoStyle" >
                <label className="label" > {field.label} </label>
                <input className="inputField" type="text" name={field.field} value={this.state.user[field.field]}  disabled={(this.state.disabled)? "disabled" : ""} onChange={this.handleChange}/>
              </div>
              )})}
              <div className="infoStyle" >
                <label className="label" > Email </label>
                <div className="salaryEST" >{this.state.user.email}</div>
              </div>
            </div>
            <div className="alignMe" >
              <div className="headerStyle" >
                {this.state.user.firstName + "'s Work Information"}
              </div>
              <div className="infoCard" >
                <div className="infoStyle" >
                  <label className="label" > Job Title </label>
                  <Select className="selectField"
                    placeholder = {this.state.currentJob}
                    options={this.state.jobs}
                    onChange={this.onJobChange}
                    value={this.state.currentJob}
                    labelKey="label"
                    valueKey="label"
                    disabled={(this.state.disabled)? "disabled" : ""}
                    />
                </div>
                <div className="infoStyle" >
                  <label className="label" > Department </label>
                  <Select className="selectField"
                    options={this.state.departments}
                    onChange={this.onDepartmentChange}
                    value={this.state.currentDepartment}
                    valueKey="id"
                    labelKey="name"
                    disabled={(this.state.disabled)? "disabled" : ""}
                    />
                </div>
                <div className="infoStyle" >
                  <label className="label" > Boss </label>
                  <Select className="selectField"
                    options={this.state.bosses}
                    onChange={this.onBossChange}
                    value={this.state.currentBoss}
                    valueKey="id"
                    labelKey="name"
                    disabled={(this.state.disabled)? "disabled" : ""}
                    />
                </div>
                <div className="infoStyle" hidden={!this.state.canEditUser} >
                  <label className="label" > Salary </label>
                  <input className="inputField" type="text" name="salary" value={this.state.user.salary} placeholder="$1,000,000.00" disabled={(this.state.disabled)? "disabled" : ""} onChange={this.handleChange}/>
                </div>
                <div className="infoStyle" >
                  <label className="label" > Salary Estimate</label>
                  <div className="salaryEST" >{this.state.salary_estimate}</div>
                  
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
          <div className="trm" >
          <button hidden={!this.state.canEditUser | this.state.buttonLabel == "Edit"} id="trmButton" className="trmButton" onClick={this.terminateUser}>Terminate User</button>
          </div>

        </div>
    );
  }
}
