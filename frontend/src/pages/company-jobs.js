import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCompanyJobs } from '../actions/jobActions'

import DashboardLayout from '../components/Dashboard-Layout'
import CompanyJobs from '../components/Company-Jobs'

const CompanyJobsPage = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const jobDetails = useSelector(state => state.jobs)
    const { jobs } = jobDetails

    useEffect(() => {
        dispatch(getCompanyJobs(user._id))
    }, [dispatch, user._id])

    return (
        <DashboardLayout active from='jobs'>

            <CompanyJobs jobs={jobs} />

        </DashboardLayout>
    )
}

export default CompanyJobsPage