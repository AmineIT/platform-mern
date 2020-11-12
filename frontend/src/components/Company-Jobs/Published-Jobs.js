import React from 'react'
import { Link } from 'react-router-dom'

import JobCard from '../Job-Card'
import { EmptyState } from './style'
import { AiOutlineFileSearch } from 'react-icons/ai'
import TableDataHeading from '../Table-Data-Heading'

const PublishedJobs = ({ jobs }) => {

    return (
        <>
            {
                jobs.length !== 0 && jobs.find(job => job.status === 'published') ? (
                    <>
                        <TableDataHeading />
                        {
                            jobs.filter(job => job.status === 'published')
                                .map(job => {
                                    return (
                                        <JobCard key={job._id} data={job} />
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
                                <p className='empty-state'>You don't any published jobs yet.</p>
                                <Link to='/job/create'>Create new job</Link>
                            </div>
                        </EmptyState>
                    )
            }
        </>
    )
}

export default PublishedJobs