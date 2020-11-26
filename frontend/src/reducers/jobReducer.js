import {
    GET_COMPANY_JOBS,
    GET_JOB_REQUEST,
    CREATE_JOB,
    SAVE_JOB_AS_DRAFT,
    GET_SINGLE_JOB,
    UPDATE_JOB,
    DELETE_JOB,
    PUBLISH_JOB,
    ARCHIVE_JOB,
    GET_ALL_JOBS
} from '../actions/types'

const initialState = {
    jobs: [],
    companyJob: {},
    isLoading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_JOB_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_ALL_JOBS:
            return {
                ...state,
                jobs: action.payload,
                companyJob: {},
                isLoading: false
            }
        case GET_COMPANY_JOBS:
            return {
                ...state,
                jobs: action.payload,
                companyJob: {},
                isLoading: false
            }
        case CREATE_JOB: {
            return {
                ...state,
                jobs: [action.payload, ...state.jobs],
                companyJob: {}
            }
        }
        case SAVE_JOB_AS_DRAFT: {
            return {
                ...state,
                jobs: [action.payload, ...state.jobs],
                companyJob: {}
            }
        }
        case GET_SINGLE_JOB: {
            return {
                ...state,
                companyJob: action.payload,
                isLoading: false
            }
        }
        case UPDATE_JOB: {
            return {
                ...state,
                jobs: state.jobs.map(job => job._id === action.payload._id ? (job = action.payload) : job)
            }
        }
        case DELETE_JOB: {
            return {
                ...state,
                jobs: state.jobs.filter(job => job._id !== action.payload)
            }
        }
        case PUBLISH_JOB: {
            return {
                ...state,
                jobs: state.jobs.map(job => job._id === action.payload ? (job.status = 'published', { ...job }) : job)
            }
        }
        case ARCHIVE_JOB: {
            return {
                ...state,
                jobs: state.jobs.map(job => job._id === action.payload ? (job.status = 'archived', { ...job }) : job)
            }
        }
        default:
            return state
    }
}