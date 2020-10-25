import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCompanyJobs } from '../../actions/jobActions'
import JobCard from '../Job-Card'

const ArchivedJobs = ({user, jobs, getCompanyJobs}) => {

    useEffect(() => {
        getCompanyJobs(user._id)
    }, [getCompanyJobs, user._id])

    return (
        <>
            {
                jobs.length !== 0 ? 
                jobs.filter(job => job.status === 'archived')
                    .map(job => {
                        return (
                            <JobCard key={job._id} data={job}/>
                        )
                    })
                : 
                (<p className='empty-state'>You don't any jobs yet.</p>)
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        jobs: state.jobs.jobs
    }
}

export default connect(mapStateToProps, { getCompanyJobs })(ArchivedJobs)