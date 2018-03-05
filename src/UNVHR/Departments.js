import React from 'react';
import './Departments.css';


const departments = [
    {
        name: "Software Engineering",
        noEmployees: 20,
    },
    {
        name: "Computer Science",
        noEmployees: 17,
    },
    {
        name: "Computer Engineering",
        noEmployees: 70,
    },
    {
        name: "Biomedical Engineering",
        noEmployees: 12,
    }
];

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
    }
    render(){
        return (
            <div className="wrapper" >
                <br/>
                <br/>
                <table className="depTable">
                    <tbody>
                    <tr>
                        <th>Department</th>
                        <th>Number of Employees</th>
                        <th>Options</th>
                    </tr>
                    <DepartmentsRow data={departments}/>
                    </tbody>
                </table>
            </div>

        );
    }
}
