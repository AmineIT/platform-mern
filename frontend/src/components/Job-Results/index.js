import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import moment from 'moment'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { fetchJob } from '../../actions/jobActions'
import { GlobalStyle, Container, JobDetails, HeaderContainer, FlexWrapper } from './style'
import Logo from '../../images/selfstarter-logo/selfstarter-logo.svg'
import { RiArrowLeftLine } from 'react-icons/ri'
import LoadingScreen from '../Loading-Screen'
import SearchField from '../Search-Component'
import KanbanTemplate from './KanbanComponent'

const JobResultsComponent = () => {

    const job = useSelector(state => state.jobs.companyJob)
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
        <DndProvider backend={HTML5Backend}>
            {job.candidates && candidates.length !== 0 ? (
                <>
                    <GlobalStyle />

                    <Container>

                        <HeaderContainer>
                            <div onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>
                                <RiArrowLeftLine size='24' />
                                <span className='ml-1'>Back</span>
                            </div>
                            <img src={Logo} alt='Selfstarter Logo' />
                        </HeaderContainer>
                        <JobDetails>
                            <FlexWrapper>
                                <h1 className='mr-4'>{job.jobTitle}</h1>
                                <span className={`tag ${job.status === 'published' ? 'is-primary' : (job.status === 'draft' ? 'is-link' : 'is-light')}`}>
                                    {job.status}
                                </span>
                            </FlexWrapper>
                            <FlexWrapper>
                                <p className='mr-4'>{job.candidates ? job.candidates.length : '0'} Candidates</p>
                                <p className='dot'>Posted on: {moment(job.expiredAt).format('MMM D, YYYY')}</p>
                            </FlexWrapper>
                            <SearchField placeholder='Search for a Candidate...' handleSearch={e => console.log(e.target.value)} />
                        </JobDetails>

                        <KanbanTemplate kanbanData={kanbanData} />

                    </Container>
                </>
            ) : (<LoadingScreen />)}
        </DndProvider>
    )
}

export default JobResultsComponent