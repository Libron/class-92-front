import React, {Component} from 'react';
import {Badge, Col, Container, ListGroup, ListGroupItem, Row} from "reactstrap";
import Toolbar from "../../components/Toolbar/Toolbar";
import {connect} from "react-redux";
import {connectWebsocket, sendMessage} from "../../store/actions/chatActions";
import {logoutUser} from "../../store/actions/usersActions";
import MessageForm from "../../components/MessageForm/MessageForm";
import ActiveUsers from "../../components/ActiveUsers/ActiveUsers";

import './Chat.css';
import AvatarThumbnail from "../../components/UI/AvatarThumbnail/AvatarThumbnail";

class Chat extends Component {
    componentDidMount() {
        if (!this.props.user) {
            return this.props.history.push('/login');
        }

        this.props.connectWebsocket(this.props.user.token);
    };

    render() {
        if (!this.props.messages || !this.props.user) {
            return <div>Loading..</div>
        }

        return (
            <div className="Chat">
                <Toolbar user={this.props.user} logout={this.props.logoutUser}/>
                <Container>
                    <Row>
                        <Col sm="9">
                            <h2 className="Title">Messages <Badge color="warning">{this.props.messages.length}</Badge></h2>
                            <ListGroup>
                                {this.props.messages.map(msg => (
                                    <ListGroupItem key={msg._id} className="Message">
                                        <AvatarThumbnail image={msg.user.image} />
                                        <p><b>{msg.user.displayname}</b> <Badge color="info">{new Date(msg.datetime).toLocaleString()}</Badge></p>
                                        <p>{msg.text}</p>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </Col>

                        <Col sm="3">
                            <ActiveUsers activeUsers={this.props.activeUsers}/>
                        </Col>
                    </Row>
                </Container>
                <Row>
                    <MessageForm displayname={this.props.user.displayname} submit={this.props.sendMessage} />
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user,
    activeUsers: state.users.activeUsers,
    messages: state.chat.messages,
    loading: state.chat.loading
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    connectWebsocket: token => dispatch(connectWebsocket(token)),
    sendMessage: msg => dispatch(sendMessage(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);