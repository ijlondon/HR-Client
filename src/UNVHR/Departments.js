import React from 'react';
import ReactDOM from 'react-dom';

import './Departments.css';
import {listDepartments, editDepartment} from './ApiConnector';



class DepartmentRow extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
        department: props.department,
        contenteditable: true,
        buttonLabel: "Edit" // initial state
    }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    }

    componentDidMount() {
        this.editButton = ReactDOM.findDOMNode(this.refs.editButton);
    }
  
    handleNameChange(e) {
        let newDepartment = this.state.department;
        newDepartment.name = e.target.value;
        this.setState({department: newDepartment});
    }
  
    toggleEdit() {
        if (!this.state.contenteditable) {
            editDepartment(this.state.department);
        }
        this.setState({
            contenteditable: !this.state.contenteditable,
            buttonLabel: this.state.contenteditable ? "Save" : "Edit" // update it here
        })
    }
    render() {
        return (
            <tr>
                <td><input value={this.state.department.name} disabled={this.state.contenteditable} onChange={this.handleNameChange} /></td>
                <td><button className="option-button" onClick = {this.toggleEdit}>{this.state.buttonLabel} </button></td>
            </tr>
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
        // get the list of departments
        listDepartments() 
        .then(response => { 
            const departments = response.data.map((department) => {
                const name = department.name;
                const id = department.id;
        
                return { id, name }
              });
              departments.sort((a, b) => a.id - b.id);
              this.setState({ departments: departments });
            });
        
        //     this.setState({departments: response.data});
        //  })
    }

    render(){
        return (
            <div className="DepWrapper" >
                <br/>
                <br/>
                <table className="depTable">
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.departments.map((department) => 
                        <DepartmentRow key={department.id} department={department} /> 
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}
