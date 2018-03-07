import React from 'react';
import './Departments.css';
import {listDepartments} from './ApiConnector';

class DepartmentsRow extends React.Component {
    render() {
        const {
            data
        } = this.props;

        return ( data.map((data) =>
                <tr>
                    <td key={data.name}>{data.name}</td>
                    <td key={data.noEmployees} className="empl">{data.noEmployees}</td>
                    <td><button className="option-button">View</button> <button className="option-button">Edit</button></td>
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
