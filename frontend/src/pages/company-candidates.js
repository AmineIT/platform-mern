import React from 'react'
import DashboardLayout from '../components/Dashboard-Layout'
import CompanyCandidates from '../components/Company-Candidates'

const CompanyCandidatesPage = () => {
    return (
        <DashboardLayout active from='candidates'>
            <CompanyCandidates />
        </DashboardLayout>
    )
}

export default CompanyCandidatesPage