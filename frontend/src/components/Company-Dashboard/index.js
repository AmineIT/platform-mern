import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCompanyJobs } from '../../actions/jobActions'
import { Doughnut } from 'react-chartjs-2'
import SkeletonLoader from 'tiny-skeleton-loader-react'

import { Heading, Card, Grid, JobList, Divider } from './style'
import Button from '../Button'

const CompanyDashboard = () => {
    const data = {
        datasets: [
            {
                label: 'Profile status',
                data: [40, 100],
                backgroundColor: [
                    'rgb(254, 126, 33, 100%)',
                    'rgb(254, 126, 33, 30%)'
                ]
            }
        ]
    }

    const option = {
        cutoutPercentage: 90,
        tooltips: {
            displayColors: false,
            enabled: false
        }
    }

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const jobDetails = useSelector(state => state.jobs)
    const { isLoading, jobs } = jobDetails

    useEffect(() => {
        dispatch(getCompanyJobs(user._id))
    }, [dispatch, user._id])

    return (
        <>
            {
                !user.isVerified ?
                    (
                        <div style={{ marginBottom: 0 }} className="message is-warning mt-4">
                            <div className="message-body">Please verify your email address, we've sent you a verification email to: <strong>{user.email}</strong></div>
                        </div>
                    )
                    :
                    null
            }

            <Heading>Welcome to {user.companyName} dashboard</Heading>

            <Card className='dashboard-profile-step'>
                <div>
                    <h5>Complete your company profile</h5>
                    <p>Extend your profile information and improve your company’s <br /> chances of finding the best applicants significantly.</p>
                    <Button size='small' to='/company-profile' light>Edit profile</Button>
                </div>
                <div className='chart'>
                    <div>
                        <span>Profile Status</span>
                        <p>Poor</p>
                    </div>
                    <Doughnut data={data} options={option}></Doughnut>
                    <p className='status'>40%</p>
                </div>
            </Card>

            <Grid>
                <div className="span-row-2 create-job-step">
                    <h5>My jobs</h5>
                    {
                        isLoading ? (
                            <>
                                <SkeletonLoader width='100px' style={{ marginBottom: '5px' }} />
                                <SkeletonLoader height='20px' style={{ marginBottom: '5px' }} />
                                <SkeletonLoader height='20px' style={{ marginBottom: '5px' }} />
                            </>
                        )
                            :
                            jobs.length !== 0 ?
                                jobs.slice(0, 3).map(job => {
                                    return (
                                        <JobList key={job._id}>
                                            {job.jobTitle} <span>({job.city})</span>
                                            <p>{job.candidates.length} Candidates</p>
                                            <Divider />
                                        </JobList>
                                    )
                                }) :
                                (<p className='empty-state'>You don't any jobs yet.</p>)
                    }
                    {jobs.length === 0 ? <div style={{ marginBottom: '160px' }}></div> : null}
                    <Button to='job/create' size='block' primary>Create new job</Button>
                </div>
                <div className="span-col-2 assessment-step">
                    <h5>Assessments</h5>
                    <p>Create your assessment and see real results before you consider a talent and shortlist effectively to drill into quality candidates. Or choose from some of the prebuilt questions <Link className='link' to='/assessments'>here.</Link></p>
                    <Button to='assessment/create' size='small' light fit='stretched' align='right'>Create assessment</Button>
                    <Button to='assessments' size='small' outline fit='stretched'>Browse questions</Button>
                </div>
                <div className="span-col-2 feedback">
                    <h5>We love feedback!</h5>
                    <p>Send us your questions, comments or ideas.</p>
                    <p className='has-text-link' style={{ fontWeight: "bold" }}>Talk to us</p>
                </div>
            </Grid>
        </>
    )
}

export default CompanyDashboard