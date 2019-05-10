import React, {Component} from 'react';
import {Col, Container, Row} from "reactstrap";

class Chat extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col sm="9">
                        <h2>MEssages</h2>
                    </Col>

                <Col sm="3">
                    <h2>Users</h2>
                </Col>
            </Row>

            </Container>
        );
    }
}

export default Chat;