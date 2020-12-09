import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { toast } from 'react-toastify'

import {
    CardWrapper,
    Title,
    GridWrapper,
    Info,
    Details,
    FlexWrapper,
    Actions
} from './style'
import { AiOutlineEllipsis } from 'react-icons/ai'

toast.configure()

const AssessmentCard = ({ data }) => {

    const [isDeleteActive, setIsDeleteActive] = useState(false)
    const [isPublishActive, setIsPublichActive] = useState(false)
    const dispatch = useDispatch()

    const showDeleteModal = () => {
        setIsDeleteActive(!isDeleteActive)
    }

    const showPublishModal = () => {
        setIsPublichActive(!isPublishActive)
    }

    // const jobDelete = (id) => {
    //     dispatch(deleteJob(id))
    //     toast.error('Your job has been deleted!', {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined
    //     });
    //     setIsDeleteActive(false)
    // }

    // const jobPublish = (id) => {
    //     dispatch(publishJob(id))
    //     toast.success('Your job has been published!', {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined
    //     });
    //     setIsPublichActive(false)
    // }

    return (
        <CardWrapper status={data.status}>
            <GridWrapper>
                <div className='span-col-2'>
                    <FlexWrapper>
                        <Title>{data.assessmentTitle}</Title>
                        <span className={`tag ${data.status === 'published' ? 'is-primary' : (data.status === 'draft' ? 'is-link' : 'is-light')}`}>
                            {data.status}
                        </span>
                    </FlexWrapper>
                    <Info>{data.questions.length} Questions</Info>
                </div>
                <Actions style={{ borderLeft: 'none' }}>
                    <Details>{data.candidates && data.candidates.length > 0 ? data.candidates.length : '0'} candidates</Details>
                </Actions>
                <Actions style={{ borderLeft: 'none' }}>
                    <Details>{!data.createdAt ? 'Not mentioned' : moment(data.createdAt).format('MMM D, YYYY')}</Details>
                </Actions>
                <Actions>
                    <div className="dropdown is-hoverable is-right">
                        <div className="dropdown-trigger">
                            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                <AiOutlineEllipsis size='24' />
                            </button>
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                            <div className="dropdown-content">
                                {
                                    data.status === 'draft' ?
                                        (<>
                                            <span onClick={showPublishModal} className="dropdown-item">
                                                Publish assessment
                                            </span>
                                            <hr className="dropdown-divider" />
                                        </>)
                                        : data.candidates && data.candidates.length > 0 ?
                                            (<>
                                                <Link to={`/assessment/results/${data._id}`} className="dropdown-item">
                                                    View assessment results
                                                </Link>
                                                <hr className="dropdown-divider" />
                                            </>) : (
                                                <>
                                                    <Link to={`/assessment/preview/${data._id}`} className="dropdown-item">
                                                        Preview assessment
                                                </Link>
                                                    <hr className="dropdown-divider" />
                                                </>
                                            )
                                }
                                <Link to={`/assessment/update/${data._id}`} className="dropdown-item">
                                    Edit assessment
                                </Link>
                                <hr className="dropdown-divider" />
                                <span onClick={showDeleteModal} className="dropdown-item">
                                    Delete assessment
                                </span>
                            </div>
                        </div>
                    </div>
                </Actions>
            </GridWrapper>

            <div className={`modal ${isDeleteActive ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Delete {data.assessmentTitle} assessment</p>
                        <button onClick={() => setIsDeleteActive(false)} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <p>Are you sure you want to delete this assessment?</p>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-danger">Delete</button>
                        <button className="button">Cancel</button>
                    </footer>
                </div>
            </div>

            <div className={`modal ${isPublishActive ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Publish {data.assessmentTitle} assessment</p>
                        <button onClick={() => setIsPublichActive(false)} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <p>Are you sure you want to publish this assessment?</p>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success">Publish</button>
                        <button className="button">Cancel</button>
                    </footer>
                </div>
            </div>
        </CardWrapper>
    )
}

export default AssessmentCard