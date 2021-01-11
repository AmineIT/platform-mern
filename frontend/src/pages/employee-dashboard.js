import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAuth, applyJob } from '../actions/authActions'
import { fetchAllJobs } from '../actions/jobActions'
import ReactHtmlParser from 'react-html-parser'
import Button from '../components/Button'

const EmployeeDashboardPage = () => {

    const dispatch = useDispatch()
    const jobs = useSelector(state => state.jobs.jobs)
    const user = useSelector(state => state.auth.user)
    const { appliedFor } = user

    useEffect(() => {
        dispatch(userAuth())
        dispatch(fetchAllJobs())
    }, [dispatch])

    const applyForJob = (id) => {
        dispatch(applyJob(id))
    }

    let applied = []
    if (jobs.length > 0) {
        applied = appliedFor.filter(element => jobs.map(job => job._id === element))
    }

    return (
        <>
            <h1>Welcome Employee</h1>
            {
                jobs.map((job) => (
                    <div key={job._id} className="card mb-4">
                        <div className="card-content">
                            <div className="content">
                                <h3>{job.jobTitle}</h3>
                                <div>
                                    {ReactHtmlParser(job.jobDescription)}
                                </div>
                                {
                                    applied.includes(job._id) ? (
                                        <p>You've already applied to this job.</p>
                                    ) : (
                                            <Button size='small' primary onClick={applyForJob.bind(this, job._id)}>Apply now</Button>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default EmployeeDashboardPage