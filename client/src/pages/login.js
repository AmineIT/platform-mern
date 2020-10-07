import React from 'react'
import { connect } from 'react-redux'

import LoginComponent from '../components/Login-Section'
import LoadingScreen from '../components/Loading-Screen'

const LoginPage = ({history, isLoading}) => {

    return (
        <>
            {
                isLoading ? 
                (<LoadingScreen />)
                :
                (<LoginComponent history={history} />)
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading
    }
}

export default connect(mapStateToProps)(LoginPage)
