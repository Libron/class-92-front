import {
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS, LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS
} from "../actions/usersActions";

const initialState = {
    registerError: null,
    user: null,
    loginError: null,
    activeUsers: [],
    displayname: ''
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
      case REGISTER_USER_SUCCESS:
          return {...state, registerError: null, user: action.user};
      case REGISTER_USER_FAILURE:
          return {...state, registerError: action.error};
      case LOGIN_USER_SUCCESS:
          return {...state, user: action.user, loginError: null};
      case LOGIN_USER_FAILURE:
          return {...state, loginError: action.error};
      case LOGOUT_USER:
          return {...state, user: null};

      case "NEW_USER":
          return {...state, activeUsers: action.userData.activeUsers, displayname: action.userData.displayname};
      case "USER_LEFT":
          return {...state, activeUsers: action.data.activeUsers, displayname: action.data.displayname}
      default:
          return state;
  }
};

export default usersReducer;