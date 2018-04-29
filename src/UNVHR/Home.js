import React from 'react';

import {listDepartments, getDepartment} from './ApiConnector';
import Select from 'react-select';
import {Link} from 'react-router';
import 'react-select/dist/react-select.css';
import './Home.css';


export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      currentDepartment: null,
      employees: [],
      currentEmployee: null,
    }

    this.onDepartmentChange = this.onDepartmentChange.bind(this)
    this.onEmployeeChange = this.onEmployeeChange.bind(this)
  }

  componentDidMount() {
    listDepartments()
    .then(response => {
      const departments = response.data.map((department) => {
        const label = department.name;
        const value = department.id;

        return { label, value }
      });
      this.setState({ departments: departments });
    });
  }

  onDepartmentChange(value) {
    // Update the displayed employee list
		this.setState({
      currentDepartment: value,
    })
    this.changeEmployees(value.value);
  }
  
  changeEmployees(departmentId) {
    getDepartment(departmentId)
    .then(department => {
      // Populate the displayed employees in the department
      let employees = department.data.workers.map(worker => { return {
        label: worker.lastName + ', ' + worker.firstName,
        value: worker.id
      }});
      this.setState({
        employees: employees
      });
    })
  }
  
  onEmployeeChange(value) {
    this.setState({
      currentEmployee: value
    });
  }

  render(){
    return (
        <div className="wrapper" >
            <h1 className="welcomeText" >Welcome to HR System</h1>
            <div className="findCard" >
              <h2>Find an Employee</h2>
              <Select className="droplistStyle"
                 placeholder = "Choose a Department"
                 options={this.state.departments}
                 onChange={this.onDepartmentChange}
                 value={this.state.currentDepartment}
              /> 
              <Select className="droplistStyle"
                 placeholder = "Choose Employee Name"
                 options={this.state.employees}
                 onChange={this.onEmployeeChange}
                 value={this.state.currentEmployee}
                 disabled={!this.state.currentDepartment}
              />

              {/* If an employee is selected, this should link to their profile. Otherwise it'll link to the home page */}
              <Link to={this.state.currentEmployee ? `/Employee/${this.state.currentEmployee.value}` :  '/Home'}>
                <button className="searchButton" disabled={this.state.currentEmployee ? '' : 'disabled'}>
                  View Profile
                </button>
              </Link>
            </div>
        </div>
    );
  }
}
