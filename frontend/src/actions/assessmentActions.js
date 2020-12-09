import axios from 'axios'
import {
    FETCH_COMPANY_ASSESSMENTS, GET_ASSESSMENT_REQUEST, CREATE_ASSESSMENT
} from './types'
import { returnErrors } from './errorActions'
import { tokenConfig } from '../actions/authActions'

// Fetch company assessments
export const fetchCompanyAssessments = () => (dispatch, getState) => {
    dispatch({
        type: GET_ASSESSMENT_REQUEST
    })
    axios.get('/assessments/fetch-company-assessments', tokenConfig(getState)).then(res => {
        dispatch({
            type: FETCH_COMPANY_ASSESSMENTS,
            payload: res.data
        })
    }).catch(error => {
        returnErrors(error.response.data, error.response.status, 'GET_COMPANY_JOBS_FAIL')
    })
}

// Add question of an assessment
export const addQuestion = (question) => (dispatch) => {
    dispatch({
        type: 'addQuestion',
        payload: question
    })
}

// Delete question of an assessment
export const removeQuestion = (id) => (dispatch) => {
    dispatch({
        type: 'removeQuestion',
        payload: id
    })
}

// Enable editing a question of an assessment
export const enableEdit = (id) => (dispatch) => {
    dispatch({
        type: 'enableEditing',
        payload: id
    })
}

// Update a question
export const updateQuestion = (question) => (dispatch) => {
    dispatch({
        type: 'updateQuestion',
        payload: question
    })
}

// Create an assessment
export const createAssessment = (values) => (dispatch, getState) => {
    axios.post('/assessments/create-assessment', values, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_ASSESSMENT,
            payload: res.data
        })
    }).catch(error => {
        returnErrors(error.response.data, error.response.status, 'CREATE_ASSESSMENT_FAIL')
    })
}