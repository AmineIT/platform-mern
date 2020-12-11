import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeQuestionFromEditing, enableEdit } from '../../actions/assessmentActions'

import { QuestionPreviewWrapper, QuestionPreview, PreviewHeader, TypeContainer, AssessmentTitle, PreviewActions, QuestionText } from '../Create-Assessment/style'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineUnorderedList, AiOutlineDelete } from 'react-icons/ai'
import { BsTextareaT, BsCodeSlash } from 'react-icons/bs'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { HiOutlineMail } from 'react-icons/hi'

const QuestionCard = ({ question, assessmentTitle, index, setShowEmptyState }) => {

    const dispatch = useDispatch()
    const [isDeleteActive, setIsDeleteActive] = useState(false)

    const deleteQuestion = (id) => {
        dispatch(removeQuestionFromEditing(id))
        setIsDeleteActive(false)
        setShowEmptyState(true)
    }

    const editQuestion = (id) => {
        dispatch(enableEdit(id))
        setShowEmptyState(false)
    }

    return (
        <>
            <QuestionPreviewWrapper>
                <QuestionPreview >
                    <PreviewHeader>
                        <TypeContainer>
                            <span className='mr-2'>Q{index + 1}</span>
                            {
                                question.type === 'text' ?
                                    <BsTextareaT size='18' />
                                    : question.type === 'multi choice' ?
                                        <AiOutlineUnorderedList size='18' />
                                        : question.type === 'choice' ?
                                            <IoMdCheckmarkCircleOutline size='18' />
                                            : question.type === 'email' ?
                                                <HiOutlineMail size='18' />
                                                : question.type === 'code' ?
                                                    <BsCodeSlash size='18' />
                                                    : null
                            }
                        </TypeContainer>

                        <AssessmentTitle>
                            {assessmentTitle === '' ? 'Assessment title' : assessmentTitle}
                        </AssessmentTitle>

                        <PreviewActions>
                            <FaRegEdit onClick={() => { editQuestion(question.id) }} size='22' color='#7E8BA2' className='mr-2' />
                            <AiOutlineDelete onClick={() => { setIsDeleteActive(true); setShowEmptyState(true) }} size='22' color='#7E8BA2' />
                        </PreviewActions>
                    </PreviewHeader>

                    <QuestionText>
                        {question.questionText}
                    </QuestionText>
                </QuestionPreview>
            </QuestionPreviewWrapper>

            <div className={`modal ${isDeleteActive ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Delete this question</p>
                        <button onClick={() => setIsDeleteActive(false)} className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <p>Are you sure you want to delete this question?</p>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={() => deleteQuestion(question.id)} className="button is-danger">Delete</button>
                        <button onClick={() => setIsDeleteActive(false)} className="button">Cancel</button>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default QuestionCard