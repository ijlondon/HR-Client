import React from 'react';
import './Profile.css';
import ReactDOM from 'react-dom'

export class Profile extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      buttonLabel: "Edit" // inital state
    }
    this.enableEdit = this.enableEdit.bind(this);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
      },
    };
  }

  componentDidMount() {
    this.editButton = ReactDOM.findDOMNode(this.refs.editButton);
    fetch('http://localhost:8080/user/1')
    .then(results => {
      return results.json();
    })
    .then(data => {
      let user = data;
      this.setState({user: user});
      console.log("state", this.state.user);
    });
  }
  enableEdit() {
    this.setState({
    disabled: !this.state.disabled,
    buttonLabel:"Save" // update it here
    })
  }

  render(){
    return (
        <div className="wrapProfile" >
            <div>
              <div><img  className="photoStyle" src={require('./profile.png')} />
              </div>
              <div className="headerStyle" >
                Your Personal Information
                <button className="editButton" onClick = {this.enableEdit}>
                  {this.state.buttonLabel}
                </button>
              </div>
              <div className="infoCard" >
                <div className="infoStyle" > 
                  <label className="label" > Name </label>
                  <input className="inputField" type="text" name="lname" placeholder="Dan Krutz" disabled = {(this.state.disabled)? "disabled" : ""}/> 
                </div>
                <div className="infoStyle" > 
                  <label className="label" > Address </label> 
                  <input className="inputField" type="text" name="lname" placeholder="1 Lomb Memorial Dr, Rochester, NY 14623" disabled = {(this.state.disabled)? "disabled" : ""}/> 
                </div>
                <div className="infoStyle" > 
                  <label className="label" > Email </label> 
                  <input className="inputField" type="text" name="lname" placeholder="DanKrutz@krutz.com" disabled = {(this.state.disabled)? "disabled" : ""}/> 
                </div>
                <div className="infoStyle" > 
                  <label className="label" > Phone </label>
                  <input className="inputField" type="text" name="lname"  placeholder="(585)-123-4567" disabled = {(this.state.disabled)? "disabled" : ""}/> 
                </div>
              </div>
              <div className="alignMe" >
                <div className="headerStyle" >
                  Your Work Information
                </div>
                <div className="infoCard" >
                  <div className="infoStyle" > 
                    <label className="label" > Job Title </label>
                    <input className="inputField" type="text" name="lname" placeholder="Assistant Professor" disabled /> 
                  </div>
                  <div className="infoStyle" > 
                    <label className="label" > Department </label> 
                    <input className="inputField" type="text" name="lname" placeholder="Software Engineering" disabled /> 
                  </div>
                  <div className="infoStyle" > 
                    <label className="label" > Salary </label> 
                    <input className="inputField" type="text" name="lname" placeholder="$1,000,000,000 per year" disabled /> 
                  </div>
                </div>
              </div>
              <div className="alignMe" >
                <div className="headerStyle" >
                  Your Work Information
                </div>
                <div className="employeeCard" >
                <div><img  style={{width:'120px', height:'120px', margin: 'auto',  display:'block'}} src={require('./profile.png')} />
                <p className="employeeName" >Andy Meneely</p>
                <button className="viewButton">
                  View Profile
                </button>
                </div>
                </div>
                <div className="employeeCard" >
                <div><img  style={{width:'120px', height:'120px', margin: 'auto',  display:'block'}} src={require('./profile.png')} />
                <p className="employeeName" >Andy Meneely</p>
                <button className="viewButton">
                  View Profile
                </button>
                </div>
                </div>
                <div className="employeeCard" >
                <div><img  style={{width:'120px', height:'120px', margin: 'auto',  display:'block'}} src={require('./profile.png')} />
                <p className="employeeName" >Andy Meneely</p>
                <button className="viewButton">
                  View Profile
                </button>
                </div>
                </div>
              </div>
            </div>
          </div>
    );
  }
};