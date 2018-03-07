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
      value: null,
    }
    this.onChange = this.onChange.bind(this)


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

  onChange(value) {
		this.setState(value)
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
                 onChange={this.onChange}
                 value={this.state.value}

              /> 
              <Select className="droplistStyle"
                 placeholder = "Choose Employee Name"
                 options={this.state.currentDepartment ? this.state.currentDepartment.employees : []}
              /> 

              <button className="searchButton" >
                Search
              </button>

            </div>
        </div>
             
    );
  }
};