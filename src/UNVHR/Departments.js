import React from 'react';
import ReactDOM from 'react-dom';

import './Departments.css';
import {listDepartments} from './ApiConnector';



class DepartmentsRow extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
      contenteditable: true,
        
      buttonLabel: "Edit" // inital state
    }
    this.enableEdit = this.enableEdit.bind(this);
  }

  componentDidMount() {
    this.editButton = ReactDOM.findDOMNode(this.refs.editButton);
  }
  
  
  enableEdit() {
    this.setState({
      contenteditable: !this.state.contenteditable,
      buttonLabel:"Save" // update it here
    })
  }
    render() {
        const {
            data
        } = this.props;

        return ( data.map((data) =>
                <tr>
                    <td contenteditable = {(this.state.contenteditable)? "contenteditable" : ""} key={data.name}>{data.name}</td>
                    <td contenteditable = {(this.state.contenteditable)? "contenteditable" : ""} key={data.head}>{data.headFirst}{" "}{data.headLast}</td>
                    <td key={data.noEmployees} className="empl">{data.noEmployees}</td>
                    <td><button className="option-button" >View</button> <button className="option-button" onClick = {this.enableEdit}>{this.state.buttonLabel} </button></td>
                </tr>)
        );
    }
}

export class Departments extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            departments: [],
        }
    }
    
    componentDidMount() {
        listDepartments()
        .then(response => {
            const departments = response.data.map(department => { return {
                name: department.name,
                headFirst: department.head.firstName,
                headLast: department.head.lastName,
                noEmployees: department.workers.length
            }});
            this.setState({departments: departments})
        });
    }

    render(){
        return (
            <div className="DepWrapper" >
                <br/>
                <br/>
                <table className="depTable">
                    <tbody>
                    <tr>
                        <th>Department</th>
                        <th>Head Name</th>
                        <th>Number of Employees</th>
                        <th>Options</th>
                        
                    </tr>
                    <DepartmentsRow data={this.state.departments}/>
                    </tbody>
                </table>
            </div>

        );
    }
}
