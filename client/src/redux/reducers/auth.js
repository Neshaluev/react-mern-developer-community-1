import { REGISTER_SUCCESS, REGISTER_FAIL, USER_AUTH, AUTH_ERROR, LOAD_USER, LOGOUT, ACCOUNT_DELETE } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    user: null
}

export default function(state = initialState, {type, payload}) {
    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                token: null, 
                user: payload,
                isAuthenticated: false,
                loading: false
            }
        case USER_AUTH:
            localStorage.setItem('token', payload.token)
            return {
                ...state, 
                token: payload.token,
                isAuthenticated: true,
                loading: false
            }
        case LOAD_USER: 
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case LOGOUT:
        case ACCOUNT_DELETE:
        case REGISTER_FAIL:
        case AUTH_ERROR: 
            localStorage.removeItem('token') 
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default: return  state;
    }
}