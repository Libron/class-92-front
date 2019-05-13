import React, {Component, Fragment} from 'react';
import {Col, Container, ListGroup, ListGroupItem, Row} from "reactstrap";
import Toolbar from "../../components/Toolbar/Toolbar";
import {connect} from "react-redux";
import {connectWebsocket, fetchMessages, sendMessage} from "../../store/actions/chatActions";
import {logoutUser} from "../../store/actions/usersActions";
import MessageForm from "../../components/MessageForm/MessageForm";

class Chat extends Component {
    componentDidMount() {
        this.props.fetchMessages();
        this.props.connectWebsocket(this.props.user.token);
    };

    render() {
        if (!this.props.messages) {
            return <div>Loading...</div>
        }

        return (
            <Fragment>
                <Toolbar user={this.props.user} logout={this.props.logoutUser}/>
                <Container>
                    <Row>
                        <Col sm="9">
                            <h2>Messages</h2>
                            <ListGroup>
                                {this.props.messages.map(msg => (
                                    <ListGroupItem key={msg._id}>
                                        <p>{msg.user.displayname} - {msg.datetime}</p>
                                        <p>{msg.text}</p>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </Col>

                        <Col sm="3">
                            <h2>Users</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <MessageForm submit={this.props.sendMessage}/>
                        </Col>
                    </Row>

                </Container>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    messages: state.chat.messages,
    loading: state.chat.loading
});

const mapDispatchToProps = dispatch => ({
    fetchMessages: () => dispatch(fetchMessages()),
    logoutUser: () => dispatch(logoutUser()),
    connectWebsocket: token => dispatch(connectWebsocket(token)),
    sendMessage: (msg) => dispatch(sendMessage(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);