import React, { useState } from 'react'
import Modal from '../Modal-Component'
import { ImagePlaceholder, Box, CTAWrapper, Score } from './style'

export const CardKanbanTemplate = ({ data }) => {

  const [show, setShow] = useState(false)
  const onClose = () => setShow(false)

  const name = data.fullName.split(' ').map(item => { return item[0] }).join('')

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
                    <img className='is-rounded' style={{width: '48px', height: '48px'}} src={`http://localhost:5000/${data.profileImage}`} alt="Profile" />
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

      <Modal item={data} onClose={onClose} show={show} />
    </>
  );
};