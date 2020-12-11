import axios from 'axios'
import {
    FETCH_COMPANY_ASSESSMENTS, GET_ASSESSMENT_REQUEST, CREATE_ASSESSMENT, FETCH_ASSESSMENT, UPDATE_ASSESSMENT, DELETE_ASSESSMENT, PUBLISH_ASSESSMENT
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

// Add question of an assessment (Create Page)
export const addQuestion = (question) => (dispatch) => {
    dispatch({
        type: 'addQuestion',
        payload: question
    })
}

// Enable question of an assessment for editing (Update Page)
export const addQuestionForEditing = (question) => (dispatch) => {
    dispatch({
        type: 'enableEditingFromUpdate',
        payload: question
    })
}

// Update question of an assessment
export const updateEditedQuestion = (question) => (dispatch) => {
    dispatch({
        type: 'updateEditedQuestion',
        payload: question
    })
}

// Add question of an assessment (Update Page)
export const addQuestionFromEditing = (question) => (dispatch) => {
    dispatch({
        type: 'addQuestionFromEditing',
        payload: question
    })
}

// Delete question of an assessment (Create Page)
export const removeQuestion = (id) => (dispatch) => {
    dispatch({
        type: 'removeQuestion',
        payload: id
    })
}
// Remove question (Update Page)
export const removeQuestionFromEditing = (id) => (dispatch) => {
    dispatch({
        type: 'removeQuestionFromEditing',
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

// Fetch a single assessment
export const fetchAssessment = (id) => (dispatch, getState) => {
    dispatch({
        type: GET_ASSESSMENT_REQUEST
    })
    axios.get(`/assessments/fetch-assessment/${id}`, tokenConfig(getState)).then(res => {
        dispatch({
            type: FETCH_ASSESSMENT,
            payload: res.data
        })
    }).catch(error => {
        returnErrors(error.response.data, error.response.status, 'FETCH_ASSESSMENT_FAIL')
    })
}

// Update a single assessment
export const updateAssessment = (values) => (dispatch, getState) => {
    axios.put(`/assessments/update-assessment/${values._id}`, values, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_ASSESSMENT,
            payload: res.data
        })
    }).catch(error => {
        returnErrors(error.response.data, error.response.status, 'UPDATE_ASSESSMENT_FAIL')
    })
}

// Delete an assessment
export const deleteAssessment = (id) => (dispatch, getState) => {
    axios.delete(`/assessments/delete-assessment/${id}`, tokenConfig(getState)).then(res => {
        dispatch({
            type: DELETE_ASSESSMENT,
            payload: id
        })
    }).catch(error => {
        returnErrors(error.response.data, error.response.status, 'DELETE_ASSESSMENT_FAIL')
    })
}

// Publish an assessment
export const publishAssessment = (id) => (dispatch, getState) => {
    axios.put(`/assessments/publish-assessment/${id}`, null, tokenConfig(getState)).then(res => {
        dispatch({
            type: PUBLISH_ASSESSMENT,
            payload: id
        })
    }).catch(error => {
        returnErrors(error.response.data, error.response.status, 'PUBLISH_ASSESSMENT_FAIL')
    })
}