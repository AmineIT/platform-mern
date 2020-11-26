import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    UPDATE_STEPS,
    UPDATE_KANBAN_STATUS,
    APPLY_JOB,
    FETCH_NOTIFICATIONS,
    CLEAR_NOTIFICATIONS
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('auth-token'),
    isAuthenticated: false,
    isLoading: false,
    user: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: false,
                isLoading: false
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        case UPDATE_STEPS:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_KANBAN_STATUS:
            return {
                ...state,
                ...action.payload
            }
        case APPLY_JOB:
            return {
                ...state,
                ...action.payload
            }
        case FETCH_NOTIFICATIONS:
            return {
                ...state,
                user: { ...state.user.notifications = action.payload, ...state.user }
            }
        case CLEAR_NOTIFICATIONS:
            return {
                ...state,
                user: { ...state.user.notifications = [], ...state.user }
            }
        default:
            return state;
    }
}
