import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAuth } from '../actions/authActions'

import RegistreComponent from '../components/Register-Section'
import LoadingScreen from '../components/Loading-Screen'

const RegistrePage = ({ history }) => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const { isLoading } = auth

    useEffect(() => {
        dispatch(userAuth())
    }, [dispatch])

    return (
        <>
            {
                isLoading ? <LoadingScreen /> : <RegistreComponent history={history} />
            }
        </>
    )
}

export default RegistrePage