import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { userAuth } from '../actions/authActions'

const EmployeeDashboardPage = ({userAuth}) => {

    useEffect(() => {
        userAuth()
    }, [userAuth]);

    return (
        <>
        <h1>Welcome Employee</h1>
        <Link to='/login'>login</Link>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
}

export default connect(mapStateToProps, { userAuth })(EmployeeDashboardPage)