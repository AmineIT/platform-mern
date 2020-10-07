import React from 'react'
import { Link } from 'react-router-dom'
import { Doughnut } from 'react-chartjs-2'

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
    return (
        <>
            <Heading>Welcome to Selfstarter dashboard</Heading>

            <Card>
                <div>
                    <h5>Complete your company profile</h5>
                    <p>Extend your profile information and improve your company’s <br/> chances of finding the best applicants significantly.</p>
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
                <div className="span-row-2">
                    <h5>My jobs</h5>
                    <JobList>
                        Graphic Designer <span>(Abu Dhabi)</span>
                        <p>210 Candidates</p>
                        <Divider />
                    </JobList>
                    <JobList>
                        Marketing Manager <span>(Dubai)</span>
                        <p>120 Candidates</p>
                        <Divider />
                    </JobList>
                    <JobList>
                        Social Media Executive <span>(Abu Dhabi)</span>
                        <p>334 Candidates</p>
                        <Divider />
                    </JobList>
                    <Button to='job/create' size='block' primary>Create new job</Button>
                </div>
                <div className="span-col-2">
                    <h5>Assessments</h5>
                    <p>Create your assessment and see real results before you consider a talent and shortlist effectively to drill into quality candidates. Or choose from some of the prebuilt questions <Link className='link' to='/assessments'>here.</Link></p>
                    <Button to='assessment/create' size='small' light fit='stretched' align='right'>Create assessment</Button>
                    <Button to='assessments' size='small' outline>See questions</Button>
                </div>
                <div className="span-col-2 feedback">
                    <h5>We love feedback!</h5>
                    <p>Send us your questions, comments or ideas.</p>
                    <a href='#'>Talk to us</a>
                </div>
            </Grid>
        </>
    )
}

export default CompanyDashboard