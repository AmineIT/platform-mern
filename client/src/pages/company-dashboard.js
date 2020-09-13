import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { userAuth, Logout } from '../actions/authActions'

const CompanyDashboardPage = ({userAuth, Logout}) => {

    useEffect(() => {
        userAuth()
    }, [userAuth])

    const logOut = () => {
        Logout()
    }

    return (
        <div>
            <h1>Welcome Admin</h1>
            <Link to='/login'>login</Link>
            <p onClick={logOut}>logout</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
}

export default connect(mapStateToProps, { userAuth, Logout })(CompanyDashboardPage)