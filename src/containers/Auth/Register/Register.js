import React, {Component} from 'react';
import {Alert, Button, Form, FormGroup, NavLink} from "reactstrap";
import {registerUser} from "../../../store/actions/usersActions";
import {connect} from "react-redux";
import FormElement from "../../../components/UI/Form/FormElement";
import {NavLink as RouterNavLink} from "react-router-dom";

class Register extends Component {
    state = {
        username: '',
        password: '',
        displayname: ''
    };

    inputChangeHandler = event => {
        this.setState({
           [event.target.name]: event.target.value
        });
    };

    submitFormHandler = event => {
      event.preventDefault();
      this.props.registerUser({...this.state});
    };

    getFieldError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    render() {
        return (
            <div className="Auth Register">
                <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Register to chat</h2>
                <p><i>Already have an account ? <NavLink style={{display: 'inline-block', padding: 0, margin: 0}} tag={RouterNavLink} to="/login" exact>Sign in now</NavLink></i></p>
                {this.props.error && this.props.error.global && (
                    <Alert color="danger">
                        {this.props.error.global}
                    </Alert>
                )}
                <Form onSubmit={this.submitFormHandler}>
                    <FormElement
                        propertyName="displayname"
                        title="Display Name"
                        type="text"
                        value={this.state.displayname}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('displayname')}
                        placeholder="Enter Full Name"
                        autoComplete="new-displayname"
                    />

                   <FormElement
                       propertyName="username"
                       title="Username"
                       type="text"
                       value={this.state.username}
                       onChange={this.inputChangeHandler}
                       error={this.getFieldError('username')}
                       placeholder="Enter your desired username"
                       autoComplete="new-username"
                   />

                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        error={this.getFieldError('password')}
                        placeholder="Enter new secure password"
                        autoComplete="new-password"
                    />

                    <FormGroup row>
                        <Button type="submit" color="success" size="lg" block style={{marginTop: '15px'}}>Register</Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  error: state.users.registerError
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);