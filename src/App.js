import React, {Component} from 'react';
import './App.css';
import Chat from "./containers/Chat/Chat";
import {connect} from "react-redux";
import {Route, Switch, withRouter} from "react-router";
import Login from "./containers/Auth/Login/Login";
import Register from "./containers/Auth/Register/Register";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Chat} />
                    <Route path="/chat" exact component={Chat} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/register" exact component={Register} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});

export default withRouter(connect(mapStateToProps)(App));