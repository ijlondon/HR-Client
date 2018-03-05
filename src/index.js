import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Root} from "./UNVHR/Root";
import {Home} from "./UNVHR/Home";
import {Profile} from "./UNVHR/Profile";
import {Departments} from "./UNVHR/Departments";

class App extends React.Component{
    render(){
        return(
            <Router history={browserHistory}>
                <Route path={"/"} component={Root}>
                    <IndexRoute component={Home}/>
                    <Route path={"Home"} component={Home}/>
                    <Route path={"Profile"} component={Profile}/>
                    <Route path={"Departments"} component={Departments}/>
                </Route>
            </Router>
        );
    }
}

render(<App/>, window.document.getElementById('app'));