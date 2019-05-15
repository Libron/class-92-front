import {
    CREATE_WS,
    FETCH_MESSAGES_FAILURE,
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS
} from "../actions/chatActions";

const initialState = {
    messages: [],
    loading: false,
    error: null,
    websocket: null
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES_REQUEST:
            return {...state, loading: true};
        case FETCH_MESSAGES_SUCCESS:
            return {...state, messages: action.messages, loading: false};
        case FETCH_MESSAGES_FAILURE:
            return {...state, error: action.error, loading: false};
        case CREATE_WS:
            return {...state, websocket: action.websocket};
        case "NEW_MESSAGE":
            return {...state, messages: [...state.messages, action.message]};
        default:
            return state;
    }
};

export default chatReducer;

