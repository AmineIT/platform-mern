import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userAuth, Logout } from '../actions/authActions'

const EmployeeDashboardPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userAuth())
    }, [dispatch])

    const onLogOut = () => {
        dispatch(Logout())
    }

    return (
        <>
            <h1>Welcome Employee</h1>
            <p onClick={onLogOut}>logout</p>
        </>
    )
}

export default EmployeeDashboardPage