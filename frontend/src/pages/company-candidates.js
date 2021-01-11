import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import DashboardLayout from '../components/Dashboard-Layout'
import CompanyCandidates from '../components/Company-Candidates'
import { userAuth } from '../actions/authActions'

const CompanyCandidatesPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userAuth())
    }, [dispatch])

    return (
        <DashboardLayout active from='candidates'>
            <CompanyCandidates />
        </DashboardLayout>
    )
}

export default CompanyCandidatesPage