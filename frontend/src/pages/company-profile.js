import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userAuth } from '../actions/authActions'

import DashboardLayout from '../components/Dashboard-Layout'
import CompanyProfileComponent from '../components/Company-Profile'

const CompanyProfilePage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userAuth())
    }, [dispatch])

    return (
        <DashboardLayout active from='company-profile'>
            <CompanyProfileComponent />
        </DashboardLayout>
    )
}

export default CompanyProfilePage