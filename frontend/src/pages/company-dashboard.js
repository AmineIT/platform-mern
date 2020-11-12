import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userAuth } from '../actions/authActions'

import DashboardLayout from '../components/Dashboard-Layout'
import CompanyDashboard from '../components/Company-Dashboard'

const CompanyDashboardPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userAuth())
    }, [dispatch])

    return (
        <DashboardLayout active from='company-dashboard'>
            <CompanyDashboard />
        </DashboardLayout>
    )
}

export default CompanyDashboardPage