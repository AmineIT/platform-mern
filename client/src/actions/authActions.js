import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';
import { returnErrors, clearErrors } from './errorActions'

// Login Action
export const Login = (user) => (dispatch) => {
    axios.post('/users/login', user).then(res => {
        localStorage.setItem('auth-token', res.data.token)
        dispatch ({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch (
            clearErrors()
        )
    }).catch(error => {
        dispatch (
            returnErrors(error.response.data, 401, 'LOGIN_FAIL')
        );
        dispatch ({
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
    // Get token from localstorage
    const token = getState().auth.token;

    // Setup the headers
    const config = {
        headers: {
            "Content-type" : "application"
        }
    }

    if (token) {
        // User loading
        dispatch({
            type: USER_LOADING
        })
        
        config.headers['Authorization'] = `Bearer ${token}`;
        axios.get('/users/authenticated', config).then(res => {
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
    }
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