import React, {Component} from 'react';
import './App.css';
import Auth from "./containers/Auth/Auth";
import Chat from "./containers/Chat/Chat";
import {connect} from "react-redux";
import {withRouter} from "react-router";

class App extends Component {
    render() {
        return (
            <div className="App">
                {this.props.user ? <Chat/> : <Auth/>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});

export default withRouter(connect(mapStateToProps)(App));