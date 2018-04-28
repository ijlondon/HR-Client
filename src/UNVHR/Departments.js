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
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount() {
    this.editButton = ReactDOM.findDOMNode(this.refs.editButton);
  }
  
  
  toggleEdit() {
    this.setState({
      contenteditable: !this.state.contenteditable,
      buttonLabel: this.state.contenteditable ? "Save" : "Edit" // update it here
    })
  }
    render() {
        const { data } = this.props;

        return (data.map((data) =>
                <tr key={data.id}>
                    <td contentEditable = {(this.state.contenteditable)? "contentEditable" : ""} key={data.name}>{data.name}</td>
                    <td><button className="option-button" onClick = {this.toggleEdit}>{this.state.buttonLabel} </button></td>
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
        // get the list of departments
        listDepartments() 
        .then(response => { 
            this.setState({departments: response.data});
         })
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
                        <th>Options</th>
                    </tr>
                    <DepartmentsRow data={this.state.departments}/>
                    </tbody>
                </table>
            </div>
        );
    }
}
