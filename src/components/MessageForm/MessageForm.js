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

        this.props.submit(JSON.stringify({
                type: 'CREATE_MESSAGE',
                text: this.state.text
        }))
    };

    render() {
        return (
            <Form onSubmit={this.submitHandler} className="MessageForm">
                <FormGroup row>
                    <Label for="text" sm={2}>{this.props.displayname} write: </Label>
                    <Col sm={8}>
                        <Input type="text" name="text" id="text" placeholder="Type here ..." value={this.state.text} onChange={this.inputChangeHandler} />
                    </Col>
                    <Button sm={2} color="warning">SEND</Button>
                </FormGroup>
            </Form>
        );
    }
}

export default MessageForm;