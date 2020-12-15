import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import moment from 'moment'
import DashboardFooter from '../Dashboard-Footer'
import { fetchJob } from '../../actions/jobActions'
import { GlobalStyle, Container, JobDetails, HeaderContainer, FlexWrapper, JobTitle } from './style'
import Logo from '../../images/selfstarter-logo/selfstarter-logo.svg'
import { RiArrowLeftLine } from 'react-icons/ri'
import LoadingScreen from '../Loading-Screen'
import KanbanTemplate from './KanbanComponent'

const JobResultsComponent = () => {

    const job = useSelector(state => state.jobs.companyJob)
    const { user: { profileImage } } = useSelector(state => state.auth)
    const { id } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchJob(id))
    }, [dispatch, id])

    let kanbanData = []
    const candidates = job.candidates

    if (job.candidates && candidates.length !== 0) {
        kanbanData = candidates.map(items => {
            const {
                aboutMe,
                currentJobRole,
                fullName,
                _id,
                kanbanStatus,
                profileImage,
                email,
                phoneNumber,
                candidateWorkExperience,
                candidateEducation } = { ...items }
            return {
                aboutMe,
                currentJobRole,
                fullName,
                _id,
                kanbanStatus,
                profileImage,
                email,
                phoneNumber,
                candidateWorkExperience,
                candidateEducation
            }
        })
    }

    return (
        <>
            {job.candidates && candidates.length !== 0 ? (
                <>
                    <GlobalStyle />

                    <Container>

                        <HeaderContainer>
                            <div onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>
                                <RiArrowLeftLine size='24' />
                                <span className='ml-1'>Back</span>
                            </div>
                            <img src={`http://localhost:5000/${profileImage}`} alt='Selfstarter Logo' />
                        </HeaderContainer>
                        <JobDetails>
                            <FlexWrapper>
                                <JobTitle className='mr-4'>{job.jobTitle}</JobTitle>
                                <span className={`tag ${job.status === 'published' ? 'is-primary' : (job.status === 'draft' ? 'is-link' : 'is-light')}`}>
                                    {job.status}
                                </span>
                            </FlexWrapper>
                            <FlexWrapper>
                                <p className='mr-4'>{job.candidates ? job.candidates.length : '0'} Candidates</p>
                                <p className='dot'>Posted on: {moment(job.createdAt).format('MMM D, YYYY')}</p>
                            </FlexWrapper>
                        </JobDetails>

                        <KanbanTemplate kanbanData={kanbanData} />

                        <DashboardFooter />

                    </Container>
                </>
            ) : (<LoadingScreen />)}
        </>
    )
}

export default JobResultsComponent