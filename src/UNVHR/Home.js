import React from 'react';

import {SearchBox} from './SearchBox'
import {listDepartments} from './ApiConnector';
import Select from 'react-select';
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
      const departments = response.data.map((department, index) => { return {
        label: department.name,
        value: index,
        employees: department.workers.map(worker => { return {
          label: worker.lastName + ', ' + worker.firstName,
          value: worker.id
        }})
      }});
      this.setState({ departments: departments });
      console.log("state", this.state);
    });
  }

  onDepartmentChange(value) {
		this.setState({
      currentDepartment: value,
      employees: value.employees
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
              /> 

              <button className="searchButton" >
                Search
              </button>

            </div>
        </div>
             
    );
  }
};