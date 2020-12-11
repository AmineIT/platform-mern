import {
    FETCH_COMPANY_ASSESSMENTS,
    GET_ASSESSMENT_REQUEST,
    CREATE_ASSESSMENT,
    FETCH_ASSESSMENT,
    UPDATE_ASSESSMENT,
    DELETE_ASSESSMENT,
    PUBLISH_ASSESSMENT
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
        case 'enableEditingFromUpdate':
            return {
                ...state,
                questions: [...state.questions, ...action.payload]
            }
        case 'updateEditedQuestion':
            return {
                ...state,
                companyAssessment: {
                    ...state.companyAssessment,
                    questions: state.companyAssessment.questions.map(question => question.id === action.payload.id ? (question = action.payload) : question)
                }
            }
        case 'addQuestionFromEditing':
            return {
                ...state,
                companyAssessment: {
                    ...state.companyAssessment,
                    questions: [...state.companyAssessment.questions, action.payload]
                }
            }
        case 'removeQuestion':
            return {
                ...state,
                questions: state.questions.filter(question => question.id !== action.payload),
                edit: false
            }
        case 'removeQuestionFromEditing':
            return {
                ...state,
                companyAssessment: {
                    ...state.companyAssessment,
                    questions: state.companyAssessment.questions.filter(question => question.id !== action.payload)
                }
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
        case FETCH_ASSESSMENT:
            return {
                ...state,
                companyAssessment: action.payload,
                isLoading: false
            }
        case UPDATE_ASSESSMENT:
            return {
                ...state,
                assessments: state.assessments.map(assessment => assessment._id === action.payload._id ? (assessment = action.payload) : assessment),
                questions: [],
                companyAssessment: {}
            }
        case DELETE_ASSESSMENT:
            return {
                ...state,
                assessments: state.assessments.filter(assessment => assessment._id !== action.payload)
            }
        case PUBLISH_ASSESSMENT: {
            return {
                ...state,
                assessment: state.assessments.map(assessment => assessment._id === action.payload ? (assessment.status = 'published', { ...assessment }) : assessment)
            }
        }
        default:
            return state
    }
}