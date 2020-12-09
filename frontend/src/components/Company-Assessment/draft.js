import React from 'react'
import { Link } from 'react-router-dom'

import { AiOutlineFileSearch } from 'react-icons/ai'
import AssessmentCard from '../Assessment-Card'
import { EmptyState } from './style'
import TableHeading from '../Table-Data-Heading-2'

const Draft = ({ assessments }) => {
    return (
        <>
            {
                assessments.length !== 0 && assessments.find(item => item.status === 'draft') ? (
                    <>
                        <TableHeading />
                        {
                            assessments.filter(job => job.status === 'draft')
                                .map(job => {
                                    return (
                                        <AssessmentCard key={job._id} data={job} />
                                    )
                                })
                        }
                    </>
                )
                    :
                    (
                        <EmptyState>
                            <div>
                                <AiOutlineFileSearch size='36' />
                                <p className='empty-state'>You don't any draft assessments yet.</p>
                                <Link to='/assessment/create'>Create new assessment</Link>
                            </div>
                        </EmptyState>
                    )
            }
        </>
    )
}

export default Draft