import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({component: Component, roles, isAuthenticated, user, isLoading, ...rest}) => {
    return(
        <>
            <Route {...rest} render={props => {
                if (user === null) {
                    return <Redirect to={{pathname: '/login', state: props.location}} />
                }

                if (!roles.includes(user.role)) {
                    return <Redirect to={{pathname: '/', state: props.location}} />
                }

                return <Component {...props} />
            }} />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.auth.isLoading
    }
}

export default connect(mapStateToProps)(PrivateRoute)