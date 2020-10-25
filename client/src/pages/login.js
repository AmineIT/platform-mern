import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { userAuth } from '../actions/authActions'

import LoginComponent from '../components/Login-Section'

const LoginPage = ({history, isLoading, userAuth}) => {

    useEffect(() => {
        userAuth()
    }, [])

    return (
        <>
            <LoginComponent history={history} />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading
    }
}

export default connect(mapStateToProps, { userAuth })(LoginPage)
