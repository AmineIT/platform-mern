import React from 'react'

import {
    ModalOverlay,
    ModalContent,
    ResultContent,
    CloseBtn,
    InfoSection,
    ImagePlaceholder,
    WorkExperience
} from './style'
import { RiCloseLine, RiSuitcaseLine } from 'react-icons/ri'
import { HiOutlineMail } from 'react-icons/hi'
import { BiPhone } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'
import { FaBusinessTime } from 'react-icons/fa'
import { IoMdTime, IoMdSchool } from 'react-icons/io'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

const Modal = ({ onClose, show, item }) => {

    const { fullName, profileImage, email, phoneNumber, aboutMe, candidateWorkExperience, candidateEducation } = item
    const name = fullName.split(' ').map(item => { return item[0] }).join('')

    return (
        <ModalOverlay isOpen={show}>
            <CloseBtn onClick={onClose}>
                <RiCloseLine size='24' color='#dbdbde' />
            </CloseBtn>
            <ModalContent isOpen={show ? 'isOpen' : ''}>
                <ResultContent>
                    <InfoSection>
                        <div className='avatar'>
                            {
                                item.profileImage === '' ? (
                                    <ImagePlaceholder>
                                        <p>{name}</p>
                                    </ImagePlaceholder>
                                ) : (
                                        <figure className="image is-96x96">
                                            <img className='is-rounded' src={`http://localhost:5000/${profileImage}`} alt='User Avatar' />
                                        </figure>
                                    )
                            }
                        </div>
                        <div>
                            <h1>{item.fullName}</h1>
                            <p>{item.currentJobRole}</p>
                            <div className="columns">
                                <div className="column">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <HiOutlineMail color='#1C65E3' size='18' className='mr-1' style={{ marginTop: '-2px' }} />
                                        <a href={`mailto:${email}`} className='email'><b>{email}</b></a>
                                    </div>
                                </div>
                                <div className="column">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <BiPhone color='#1C65E3' size='18' className='mr-1' style={{ marginTop: '-2px' }} />
                                        <p className='phone'><b>{phoneNumber}</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </InfoSection>

                    <Tabs>
                        <TabList>
                            <Tab>Assessment results</Tab>
                            <Tab>Candidate info</Tab>
                        </TabList>
                        <TabPanel>
                            <p>Assessment results</p>
                        </TabPanel>
                        <TabPanel>
                            <div>
                                <h2 className='heading'>Summary:</h2>
                                <p className='summary'>{aboutMe}</p>
                            </div>
                            <div className='mt-4'>
                                <h2 className='heading'>Work Experience ({candidateWorkExperience.length}):</h2>
                                {
                                    candidateWorkExperience.length === 0 ? (
                                        <p>This candidate does not have any work experience yet.</p>
                                    ) :
                                        candidateWorkExperience.map(e => (
                                            <WorkExperience key={e._id} className='mt-4'>
                                                <div className='columns'>
                                                    <div className='column'>
                                                        <div className='experience-info'>
                                                            <GoLocation color='#7E8BA2' />
                                                            <p>{e.location}</p>
                                                        </div>
                                                    </div>
                                                    <div className='column'>
                                                        <div className='experience-info'>
                                                            <RiSuitcaseLine color='#7E8BA2' />
                                                            <p>{e.employmentType}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h4>{e.jobTitle} - {<b style={{ color: '#1C65E3' }}>{e.workedAt}</b>}</h4>
                                                <p className='description'>{e.description}</p>
                                                <div className='experience-info mb-4'>
                                                    <FaBusinessTime color='#7E8BA2' />
                                                    <p>{e.startDate.month} {e.startDate.year} - {e.endDate.month} {e.endDate.year}</p>
                                                </div>
                                            </WorkExperience>
                                        ))
                                }
                            </div>
                            <div className='mt-4'>
                                <h2 className='heading'>Education ({candidateEducation.length}):</h2>
                                {
                                    candidateEducation.length === 0 ? (
                                        <p>This candidate does not have any education yet.</p>
                                    ) : candidateEducation.map(e => (
                                        <WorkExperience key={e._id} className='mt-4'>
                                            <div className='columns'>
                                                <div className='column'>
                                                    <div className='experience-info'>
                                                        <GoLocation color='#7E8BA2' />
                                                        <p>{e.location}</p>
                                                    </div>
                                                </div>
                                                <div className='column'>
                                                    <div className='experience-info'>
                                                        <IoMdSchool color='#7E8BA2' />
                                                        <p>{e.schoolName}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <h4>{e.degree} - {e.fieldOfStudy}</h4>
                                            <div className='experience-info mb-4'>
                                                <IoMdTime color='#7E8BA2' />
                                                <p>{e.startDate.month} {e.startDate.year} - {e.endDate.month} {e.endDate.year}</p>
                                            </div>
                                        </WorkExperience>
                                    ))
                                }
                            </div>
                        </TabPanel>
                    </Tabs>
                </ResultContent>
            </ModalContent>
        </ModalOverlay>
    )
}

export default Modal