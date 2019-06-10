import { PROFILE_GET, PROFILE_ERROR, PROFILE_CLEAR, PROFILE_UPDATE, PROFILE_GETS } from "../actions/types";

const initialState  = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function (state = initialState, {type, payload}) {
    switch(type) {
        case PROFILE_GET: 
        case PROFILE_UPDATE: 
            return {
                ...state, 
                profile: payload,
                loading: false
            }
        case PROFILE_GETS: 
            return {
                ...state, 
                profiles: payload,
                loading: false
            }
        case PROFILE_ERROR: 
            return {
                ...state,
                error: payload,
                loading: false
            }
        case PROFILE_CLEAR: 
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        default: return state;
    }
}