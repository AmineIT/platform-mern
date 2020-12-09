import {
    FETCH_COMPANY_ASSESSMENTS,
    GET_ASSESSMENT_REQUEST,
    CREATE_ASSESSMENT
} from '../actions/types'

const initialState = {
    assessments: [],
    companyAssessment: {},
    isLoading: false,
    questions: [],
    edit: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ASSESSMENT_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_COMPANY_ASSESSMENTS:
            return {
                ...state,
                assessments: action.payload,
                companyAssessment: {},
                isLoading: false
            }
        case 'addQuestion':
            return {
                ...state,
                questions: [...state.questions, action.payload]
            }
        case 'removeQuestion':
            return {
                ...state,
                questions: state.questions.filter(question => question.id !== action.payload),
                edit: false
            }
        case 'enableEditing':
            return {
                ...state,
                questionDetails: state.questions.filter(question => question.id === action.payload),
                edit: true
            }
        case 'updateQuestion':
            return {
                ...state,
                questions: state.questions.map(question => question.id === action.payload.id ? (question = action.payload) : question),
                edit: false
            }
        case CREATE_ASSESSMENT:
            return {
                ...state,
                assessments: [action.payload, ...state.assessments]
            }
        default:
            return state
    }
}