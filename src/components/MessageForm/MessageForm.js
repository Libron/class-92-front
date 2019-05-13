import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class MessageForm extends Component {
    state = {
        text: '',
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitHandler = event => {
        event.preventDefault();
        console.log(this.state);
        this.props.submit(JSON.stringify({
                type: 'CREATE_MESSAGE',
                text: this.state.text
        }))
    };

    render() {
        return (
            <Form onSubmit={this.submitHandler}>
                <FormGroup row>
                    <Label for="text" sm={2}>Email</Label>
                    <Col sm={8}>
                        <Input type="text" name="text" id="text" placeholder="Type here ..." value={this.state.text} onChange={this.inputChangeHandler} />
                    </Col>
                    <Button sm={2}>SEND</Button>
                </FormGroup>

            </Form>
        );
    }
}

export default MessageForm;