import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Root} from "./UNVHR/Root";
import {Home} from "./UNVHR/Home";
import {Profile} from "./UNVHR/Profile";
import {Employee} from "./UNVHR/Employee";
import {Departments} from "./UNVHR/Departments";
import {getCurrentUser} from './UNVHR/UserService';
import { LoginPrompt } from './UNVHR/LoginPrompt';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.requireAuth = this.requireAuth.bind(this);
        this.redirectAfterAuth = this.redirectAfterAuth.bind(this);
    }

    requireAuth(nextState, replace) {
        if (!getCurrentUser()) {
            replace({
                pathname: '/LoginPrompt'
            })
        }
    }

    redirectAfterAuth(nextState, replace) {
        if (getCurrentUser()) {
            replace({
                pathname: '/'
            })
        }
    }
          
    render(){
        return(
            <Router history={browserHistory}>
                <Route path={"/"} component={Root}>
                    <IndexRoute component={Home} onEnter={this.requireAuth}/>
                    <Route path={"LoginPrompt"} component={LoginPrompt} onEnter={this.redirectAfterAuth}/>
                    <Route path={"Home"} component={Home} onEnter={this.requireAuth}/>
                    <Route path={"Employee/:employeeId"} component={Employee} onEnter={this.requireAuth}/>
                    <Route path={"Profile"} component={Profile} onEnter={this.requireAuth}/>
                    <Route path={"Departments"} component={Departments} onEnter={this.requireAuth}/>
                </Route>
            </Router>
        );
    }
}

render(<App/>, window.document.getElementById('app'));