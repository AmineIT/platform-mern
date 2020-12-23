import React, { useState } from 'react'
import Modal from '../Modal-Component'
import {
  ImagePlaceholder,
  Box,
  CTAWrapper,
  Score,
  InfoSection,
  ModalImagePlaceholder,
  WorkExperience
} from './style'

import { RiSuitcaseLine } from 'react-icons/ri'
import { HiOutlineMail } from 'react-icons/hi'
import { BiPhone } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'
import { FaBusinessTime } from 'react-icons/fa'
import { IoMdTime, IoMdSchool } from 'react-icons/io'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export const CardKanbanTemplate = ({ data }) => {

  const [show, setShow] = useState(false)
  const onClose = () => setShow(false)

  const { fullName, profileImage, email, phoneNumber, aboutMe, candidateWorkExperience, candidateEducation, currentJobRole } = data

  const name = fullName.split(' ').map(item => { return item[0] }).join('')

  return (
    <>
      <Box score='90'>
        <article className="media">
          <div className="media-left">
            {
              data.profileImage === '' ? (
                <ImagePlaceholder>
                  <p>{name}</p>
                </ImagePlaceholder>
              ) : (
                  <figure className="image is-48x48">
                    <img className='is-rounded' style={{ width: '48px', height: '48px' }} src={`http://localhost:5000/${data.profileImage}`} alt="Profile" />
                  </figure>
                )
            }
          </div>
          <div className="media-content">
            <div className="content">
              <p className='fullname'>
                <strong>{data.fullName}</strong>
              </p>
              <div className='score'>
                <p><Score score='90' style={{ fontWeight: "bold" }}>91% </Score>- my score</p>
              </div>
            </div>
          </div>
        </article>
        <CTAWrapper>
          <div>
            <p>Completed 2 days ago.</p>
          </div>
          <div>
            <p onClick={() => setShow(true)} className='result-cta'>View results</p>
          </div>
        </CTAWrapper>
      </Box>

      <Modal onClose={onClose} show={show} >
        <InfoSection>
          <div className='avatar'>
            {
              profileImage === '' ? (
                <ModalImagePlaceholder>
                  <p>{name}</p>
                </ModalImagePlaceholder>
              ) : (
                  <figure className="image is-96x96">
                    <img className='is-rounded' src={`http://localhost:5000/${profileImage}`} alt='User Avatar' />
                  </figure>
                )
            }
          </div>
          <div>
            <h1>{fullName}</h1>
            <p>{currentJobRole}</p>
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
      </Modal>
    </>
  );
};