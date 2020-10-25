import React from 'react'

import DashboardLayout from '../components/Dashboard-Layout'
import CompanyJobs from '../components/Company-Jobs'

const CompanyJobsPage = () => {
    return (
        <DashboardLayout active from='jobs'>
            <CompanyJobs />
        </DashboardLayout>
    )
}

export default CompanyJobsPage