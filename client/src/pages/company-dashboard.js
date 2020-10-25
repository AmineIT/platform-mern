import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { userAuth } from '../actions/authActions'

import DashboardLayout from '../components/Dashboard-Layout'
import CompanyDashboard from '../components/Company-Dashboard'

const CompanyDashboardPage = ({userAuth, user}) => {

    useEffect(() => {
        userAuth()
    }, [])

    return (
        <DashboardLayout active from='company-dashboard'>
            <CompanyDashboard />
        </DashboardLayout>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { userAuth })(CompanyDashboardPage)