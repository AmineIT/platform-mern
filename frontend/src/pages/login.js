import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAuth } from '../actions/authActions'

import LoginComponent from '../components/Login-Section'
import LoadingScreen from '../components/Loading-Screen'

const LoginPage = ({ history }) => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const { isLoading } = auth

    useEffect(() => {
        dispatch(userAuth())
    }, [dispatch])

    return (
        <>
            {
                isLoading ? <LoadingScreen /> : <LoginComponent history={history} />
            }
        </>
    )
}

export default LoginPage
