import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteJob, publishJob, archiveJob } from '../../actions/jobActions'
import moment from 'moment'
import { toast } from 'react-toastify'

import { 
    JobCardWrapper, 
    JobTitle, 
    GridWrapper, 
    JobLocation, 
    JobTime, 
    FlexWrapper, 
    Actions } from './style'
import { AiOutlineEllipsis } from 'react-icons/ai'

toast.configure()

const JobCard = ({data, deleteJob, publishJob, archiveJob}) => {

    const [isDeleteActive, setIsDeleteActive] = useState(false)
    const [isPublishActive, setIsPublichActive] = useState(false)
    const [isArchiveActive, setIsArchiveActive] = useState(false)

    const showDeleteModal = () => {
        setIsDeleteActive(!isDeleteActive)
    }

    const showPublishModal = () => {
        setIsPublichActive(!isPublishActive)
    }

    const showArchiveModel = () => {
        setIsArchiveActive(!isArchiveActive)
    }

    const jobDelete = (id) => {
        deleteJob(id)
        toast.error('Your job has been deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
        setIsDeleteActive(false)
    }

    const jobPublish = (id) => {
        publishJob(id)
        toast.success('Your job has been published!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
        setIsPublichActive(false)
    }

    const jobArchive = (id) => {
        archiveJob(id)
        toast.dark('Your job has been archived!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
        setIsArchiveActive(false)
    }

    // console.log(data.jobTitle ,moment(data.expiredAt).isSame(moment(), 'day'))

    return (
        <JobCardWrapper status={data.status}>
            <GridWrapper>
                <div className='span-col-2'>
                    <FlexWrapper>
                        <JobTitle>{data.jobTitle}</JobTitle>
                        <span className={`tag ${data.status === 'published' ? 'is-primary' : (data.status === 'draft' ? 'is-link' : 'is-light')}`}>
                            {data.status}
                        </span>
                    </FlexWrapper>
                    <JobLocation>{data.city}, {data.country}</JobLocation>
                </div>
                <div>
                    <JobTime>{!data.expiredAt ? 'Not mentioned' : moment(data.expiredAt).format('MMM D, YYYY')}</JobTime>
                </div>
                <div>
                    <JobTime>{! data.createdAt ? 'Not mentioned' : moment(data.createdAt).format('MMM D, YYYY')}</JobTime>
                </div>
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
                                    data.status === 'draft' || data.status === 'archived' ?
                                    (<a onClick={showPublishModal} href="#" className="dropdown-item">
                                        Publish job
                                    </a>)
                                    :
                                    (<a href="#" className="dropdown-item">
                                        View job results
                                    </a>)
                                }
                                <hr className="dropdown-divider"/>
                                <Link to={`/job/update/${data._id}`} className="dropdown-item">
                                    Edit job
                                </Link>
                                {
                                    data.status === 'published' ? 
                                    (
                                    <>
                                        <hr className="dropdown-divider"/>
                                        <a onClick={showArchiveModel} href='#' className="dropdown-item">
                                            Archive job
                                        </a>
                                    </>
                                    )
                                    : null
                                }
                                <hr className="dropdown-divider"/>
                                <a onClick={showDeleteModal} href="#" className="dropdown-item">
                                    Delete job
                                </a>
                            </div>
                        </div>
                    </div>
                </Actions>
            </GridWrapper>

            <div className={`modal ${isDeleteActive ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Delete {data.jobTitle} job</p>
                        <button onClick={() => setIsDeleteActive(false)} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <p>Are you sure you want to delete this job?</p>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={jobDelete.bind(this, data._id)} className="button is-danger">Delete</button>
                        <button className="button">Cancel</button>
                    </footer>
                </div>
            </div>

            <div className={`modal ${isPublishActive ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Publish {data.jobTitle} job</p>
                        <button onClick={() => setIsPublichActive(false)} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <p>Are you sure you want to publish this job?</p>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={jobPublish.bind(this, data._id)} className="button is-success">Publish</button>
                        <button className="button">Cancel</button>
                    </footer>
                </div>
            </div>

            <div className={`modal ${isArchiveActive ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Archive {data.jobTitle} job</p>
                        <button onClick={() => setIsArchiveActive(false)} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <p>Are you sure you want to archive this job?</p>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={jobArchive.bind(this, data._id)} className="button is-success">Archive</button>
                        <button className="button">Cancel</button>
                    </footer>
                </div>
            </div>
        </JobCardWrapper>
    )
}

export default connect(null, { deleteJob, publishJob, archiveJob })(JobCard)