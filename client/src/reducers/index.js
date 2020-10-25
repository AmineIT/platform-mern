import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import jobReducer from './jobReducer'

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    jobs: jobReducer
})