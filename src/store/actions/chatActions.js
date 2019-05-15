import axios from "../../axios-api";
import {wsURL} from "../../constants";
import {push} from 'connected-react-router';

export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';
export const CREATE_WS = 'CREATE_WS';

const fetchMessagesRequest = () => ({type: FETCH_MESSAGES_REQUEST});
const fetchMessagesSuccess = messages => ({type: FETCH_MESSAGES_SUCCESS, messages});
const fetchMessagesFailure = error => ({type: FETCH_MESSAGES_FAILURE, error});

const createWs = websocket => ({type: CREATE_WS, websocket});

export const fetchMessages = limit => {
    return dispatch => {
        dispatch(fetchMessagesRequest());
        let query;
        if (limit) {
            query = '?limit=' + limit;
        }
        return axios.get('/messages' + query).then(
            response => {
                dispatch(fetchMessagesSuccess(response.data));
            },
            error => {
                if (error.response) {
                    dispatch(fetchMessagesFailure(error.response.data))
                } else {
                    dispatch(fetchMessagesFailure({global: 'No connection'}))
                }
            }
        )
    };
};


export const connectWebsocket = token => {
    return dispatch => {
        if (!token) {
            return dispatch(push('/auth'));
        }

        const ws = new WebSocket(wsURL + '/chat?token=' + token);
        dispatch(fetchMessages(30));
        dispatch(createWs(ws));

        ws.onmessage = event => {
            let decodedMessage;
            try {
                decodedMessage = JSON.parse(event.data);
            } catch (e) {
                throw Error();
            }

            switch (decodedMessage.type) {
                case 'NEW_USER':
                    const userData = {
                        activeUsers: decodedMessage.activeUsers,
                        user: decodedMessage.displayname
                    };
                    return dispatch({type: decodedMessage.type, userData});

                case 'NEW_MESSAGE':
                    dispatch({type: decodedMessage.type, message: decodedMessage.message});
                    return;
                default:
                    return;
            }
        };
    };
};

export const sendMessage = text => {
    return (dispatch, getState) => {
        const ws = getState().chat.websocket;
        console.log('SEND MESSAGE HANDLER', text);
        ws.send(text);
    };
};