import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { userAuth } from '../actions/authActions'

import LoadingScreen from '../components/Loading-Screen'
import DashboardLayout from '../components/Dashboard-Layout'
import CompanyDashboard from '../components/Company-Dashboard'

const CompanyDashboardPage = ({userAuth, isLoading, user}) => {

    useEffect(() => {
        userAuth()
    }, [userAuth])

    return (
        <div>
            {
                isLoading && !user ? 
                (<LoadingScreen/>)
                :
                (
                    <DashboardLayout>
                        <CompanyDashboard />
                    </DashboardLayout>
                )
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { userAuth })(CompanyDashboardPage)