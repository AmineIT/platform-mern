import axios from 'axios'
import {
    GET_COMPANY_JOBS,
    CREATE_JOB,
    SAVE_JOB_AS_DRAFT,
    GET_SINGLE_JOB,
    UPDATE_JOB,
    DELETE_JOB,
    PUBLISH_JOB,
    ARCHIVE_JOB,
    GET_JOB_REQUEST
} from './types'
import { returnErrors } from './errorActions'
import { tokenConfig } from '../actions/authActions'

export const getCompanyJobs = (companyID) => (dispatch, getState) => {
    dispatch({
        type: GET_JOB_REQUEST
    })
    axios.post('/jobs/fetch-company-jobs', { companyID }, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_COMPANY_JOBS,
            payload: res.data
        })
    }).catch(error => {
        returnErrors(error.response.data, error.response.status, 'GET_COMPANY_JOBS_FAIL')
    })
}

export const createJob = (values) => (dispatch, getState) => {
    axios.post('/jobs/create-job', values, tokenConfig(getState)).then(res => {
        dispatch({
            type: CREATE_JOB,
            payload: res.data
        })
    }).catch(error => {
        returnErrors(error.response.data, error.response.status, 'CREATE_JOB_FAIL')
    })
}

export const saveJobAsDraft = (values) => (dispatch, getState) => {
    axios.post('/jobs/create-job', values, tokenConfig(getState)).then(res => {
        dispatch({
            type: SAVE_JOB_AS_DRAFT,
            payload: res.data
        })
    }).catch(error => {
        returnErrors(error.response.data, error.response.status, 'SAVE_JOB_FAIL')
    })
}

export const fetchJob = (id) => (dispatch, getState) => {
    dispatch({
        type: GET_JOB_REQUEST
    })
    axios.get(`/jobs/fetch-job/${id}`, tokenConfig(getState)).then(res => {
        dispatch({
            type: GET_SINGLE_JOB,
            payload: res.data
        })
    }).catch(error => {
        returnErrors(error.response.data, error.response.status, 'GET_JOB_FAIL')
    })
}

export const updateJob = (values) => (dispatch, getState) => {
    const id = values.jobId
    axios.put(`/jobs/update-job/${id}`, values, tokenConfig(getState)).then(res => {
        dispatch({
            type: UPDATE_JOB,
            payload: res.data
        })
    }).catch(error => {
        returnErrors(error.response.data, error.response.status, 'UPDATE_JOB_FAIL')
    })
}

export const deleteJob = (id) => (dispatch, getState) => {
    axios.delete(`jobs/delete-job/${id}`, tokenConfig(getState)).then(res => {
        dispatch({
            type: DELETE_JOB,
            payload: id
        })
    }).catch(error => {
        returnErrors(error.response.data, error.response.status, 'UPDATE_JOB_FAIL')
    })
}

export const publishJob = (id) => (dispatch, getState) => {
    axios.post(`jobs/publish-job/${id}`, null, tokenConfig(getState)).then(res => {
        dispatch({
            type: PUBLISH_JOB,
            payload: id
        })
    }).catch(error => {
        returnErrors(error.response.data, error.response.status, 'PUBLISH_JOB_FAIL')
    })
}

export const archiveJob = (id) => (dispatch, getState) => {
    axios.post(`/jobs/archive-job/${id}`, null, tokenConfig(getState)).then(res => {
        dispatch({
            type: ARCHIVE_JOB,
            payload: id
        })
    }).catch(error => {
        returnErrors(error.response.data, error.response.status, 'ARCHIVE_JOB_FAIL')
    })
}