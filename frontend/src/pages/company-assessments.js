import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCompanyAssessments } from '../actions/assessmentActions'

import DashboardLayout from '../components/Dashboard-Layout'
import CompanyAssessmentComponent from '../components/Company-Assessment'

const CompanyAssessmentsPage = () => {

    const assessmentDetails = useSelector(state => state.assessments)
    const { assessments } = assessmentDetails
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCompanyAssessments())
    }, [dispatch])

    return (
        <DashboardLayout active from='assessments'>
            <CompanyAssessmentComponent assessments={assessments} />
        </DashboardLayout>
    )
}

export default CompanyAssessmentsPage