import axios from 'axios';
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
} from './types';
import { returnErrors, clearErrors } from './errorActions'

// Login Action
export const Login = (user) => (dispatch) => {
    axios.post('/users/login', user).then(res => {
        localStorage.setItem('auth-token', res.data.token)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(
            clearErrors()
        )
    }).catch(error => {
        dispatch(
            returnErrors(error.response.data, 401, 'LOGIN_FAIL')
        );
        dispatch({
            type: LOGIN_FAIL
        });
    })
};

// Register Action
export const Register = (user) => (dispatch) => {
    axios.post('/users/register', user).then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    }).catch(error => {
        dispatch(
            returnErrors(error.response.data, error.response.status, 'REGISTER_FAIL')
        );
        dispatch({
            type: REGISTER_FAIL
        });
    })
};

// Check token and load user
export const userAuth = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    })
    if (tokenConfig(getState).headers['Authorization']) {
        axios.get('/users/authenticated', tokenConfig(getState)).then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch(error => {
            dispatch(
                returnErrors(error.response.data, error.response.status, 'AUTHENTIFICATION_FAIL')
            )
            dispatch({
                type: AUTH_ERROR
            })
        })
    } else {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Update steps
export const updateSteps = () => (dispatch, getState) => {
    axios.post('/users/update-steps', null, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_STEPS,
            payload: res.data
        })
    }).catch(error => {
        dispatch(
            returnErrors(error.response.data, error.response.status, 'UPDATE_STEPS_FAIL')
        );
    })
}

// Logout Action
export const Logout = () => (dispatch) => {
    axios.get('/users/logout').then(res => {
        dispatch({
            type: LOGOUT_SUCCESS,
            payload: res.data
        })
        localStorage.removeItem('auth-token')
    }).catch(error => {
        dispatch(
            returnErrors(error.response.data, error.response.status, 'LOGOUT_FAIL')
        );
    })
}

// Update Kanban Status
export const updateKanbanStatus = (id, kanbanStatus) => (dispatch, getState) => {
    axios.put('/users/update-kanbanstatus', { id, kanbanStatus }, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_KANBAN_STATUS,
            payload: res.data
        })
    }).catch(error => {
        dispatch(
            returnErrors(error.response.data, error.response.status, 'UPDATE_KANBAN_STATUS_FAIL')
        );
    })
}

// Apply for a job
export const applyJob = (id) => (dispatch, getState) => {
    axios.put(`/users/apply-job/${id}`, null, tokenConfig(getState)).then(res => {
        dispatch({
            type: APPLY_JOB,
            payload: res.data
        })
    }).catch(error => {
        dispatch(
            returnErrors(error.response.data, error.response.status, 'APPLY_JOB_FAIL')
        );
    })
}

// Fetch Notifications
export const fetchNotification = () => (dispatch, getState) => {
    axios.get('/users/fetch-notifications', tokenConfig(getState)).then(res => {
        dispatch({
            type: FETCH_NOTIFICATIONS,
            payload: res.data
        })
    }).catch(error => {
        dispatch(
            returnErrors(error.response.data, error.response.status, 'FETCH_NOTIFICATION_FAIL')
        );
    })
}

// Clear Notifications
export const clearNotifications = () => (dispatch, getState) => {
    axios.post('/users/clear-notifications', null, tokenConfig(getState)).then(res => {
        dispatch({
            type: CLEAR_NOTIFICATIONS,
            payload: res.data
        })
    }).catch(error => {
        dispatch(
            returnErrors(error.response.data, error.response.status, 'CLEAR_NOTIFICATION_FAIL')
        );
    })
}

// Setup config/headers and token
export const tokenConfig = (getState) => {
    // Get token from localstorage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    };

    // If token, add to headers
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
};