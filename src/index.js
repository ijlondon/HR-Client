import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Root} from "./UNVHR/Root";
import {Home} from "./UNVHR/Home";
import {Login} from "./UNVHR/Login";
import {Profile} from "./UNVHR/Profile";
import {Employee} from "./UNVHR/Employee";
import {Departments} from "./UNVHR/Departments";
import {getCurrentUser} from './UNVHR/UserService';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.requireAuth = this.requireAuth.bind(this);
    }

    requireAuth(nextState, replace) {
        if (!getCurrentUser()) {
            replace({
                pathname: '/'
            })
        }
    }
          
    render(){
        return(
            <Router history={browserHistory}>
                <Route path={"/"} component={Root}>
                    <IndexRoute component={Home}/>
                    <Route path={"Home"} component={Home}/>
                    <Route path={"Employee/:employeeId"} component={Employee} onEnter={this.requireAuth}/>
                    <Route path={"Profile"} component={Profile} onEnter={this.requireAuth}/>
                    <Route path={"Departments"} component={Departments} onEnter={this.requireAuth}/>
                </Route>
            </Router>
        );
    }
}

render(<App/>, window.document.getElementById('app'));