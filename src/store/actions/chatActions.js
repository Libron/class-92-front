import axios from "../../axios-api";
import {wsURL} from "../../constants";

export let WS;

export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';

const fetchMessagesRequest = () => ({type: FETCH_MESSAGES_REQUEST});
const fetchMessagesSuccess = messages => ({type: FETCH_MESSAGES_SUCCESS, messages});
const fetchMessagesFailure = error => ({type: FETCH_MESSAGES_FAILURE, error});

export const fetchMessages = () => {
    return dispatch => {
        dispatch(fetchMessagesRequest());
        return axios.get('/messages').then(
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
        WS = new WebSocket(wsURL + '/chat?token=' + token);
        WS.onmessage = event => {
            let decodedMessage;
            try {
                decodedMessage = JSON.parse(event.data);
            } catch (e) {
                throw Error();
            }

            switch (decodedMessage.type) {
                case 'NEW_USER':
                    console.log(decodedMessage);
                    return;
                case 'NEW_MESSAGE':
                    console.log('NEW_MESSAGE');
                    return;
                default:
                    return;
            }
        };
    };
};

export const sendMessage = text => {
    return dispatch => {
        WS.send(text);
    };
};