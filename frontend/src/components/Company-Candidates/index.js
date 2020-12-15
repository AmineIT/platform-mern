import React from 'react'
import { useSelector } from 'react-redux'
import DataTable from '../Data-Table'
import { Heading } from './style'

const CompanyCandidates = () => {
    const { user: { companyName } } = useSelector(state => state.auth)
    return (
        <>
            <Heading className='mb-4'>{companyName} Hiring Pipeline</Heading>
            <DataTable />
        </>
    )
}

export default CompanyCandidates