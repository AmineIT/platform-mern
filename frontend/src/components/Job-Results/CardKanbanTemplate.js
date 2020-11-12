import React, { useState } from 'react'
import Modal from '../Modal-Component'
import { ImagePlaceholder } from './style'

export const CardKanbanTemplate = ({ data }) => {

  const [show, setShow] = useState(false)
  const onClose = () => setShow(false)

  const name = data.fullName.split(' ').map(item => { return item[0] }).join('')

  return (
    <>
      <div className="box">
        <article className="media">
          <div className="media-left">
            {
              data.profileImage === '' ? (
                <ImagePlaceholder>
                  <p>{name}</p>
                </ImagePlaceholder>
              ) : (
                  <figure className="image is-48x48">
                    <img className='is-rounded' src={`http://localhost:5000/${data.profileImage}`} alt="Profile" />
                  </figure>
                )
            }
          </div>
          <div className="media-content">
            <div className="content">
              <p className='fullname'>
                <strong>{data.fullName}</strong>
              </p>
              <p className='jobrole'>
                <small>{data.currentJobRole}</small>
              </p>
              <p className='score'>
                <strong>Assessment score - <span>91/100</span></strong>
              </p>
              <p onClick={() => setShow(true)} className='result-cta'>View results</p>
            </div>
          </div>
        </article>
      </div>

      <Modal item={data} onClose={onClose} show={show} />
    </>
  );
};