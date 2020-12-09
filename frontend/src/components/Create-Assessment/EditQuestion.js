import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateQuestion } from '../../actions/assessmentActions'
import { v4 as uuidv4 } from 'uuid'

import { QuestionsOptionsWrapper, OptionsGrid, Option, OptionContent } from './style'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { BsTextareaT, BsCodeSlash } from 'react-icons/bs'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { MdAdd } from 'react-icons/md'
import { HiOutlineMail } from 'react-icons/hi'
import { AiOutlineDelete } from 'react-icons/ai'
import Button from '../Button'

const EditQuestion = ({ errors, setshowEmptyState, setUpdatedQuestion, updatedQuestion }) => {

    const dispatch = useDispatch()
    const [showError, setShowError] = useState(false)
    const [showOptionError, setShowOptionError] = useState(false)

    const appendInput = () => {
        const newInput = { id: uuidv4(), text: '' }
        setUpdatedQuestion({ ...updatedQuestion, options: [...updatedQuestion.options, newInput] })
    }

    const removeInput = (id) => {
        const removedArray = updatedQuestion.options.filter(option => option.id !== id)
        setUpdatedQuestion({ ...updatedQuestion, options: [...removedArray] })
    }

    const handleOptionChange = (id, value) => {
        setShowOptionError(false)
        updatedQuestion.options.map(option => {
            if (option.id === id) {
                option.text = value
            }
        })
    }

    const editQuestion = () => {
        dispatch(updateQuestion(updatedQuestion))
        setUpdatedQuestion({})
        setshowEmptyState(true)
    }

    return (
        <>
            <QuestionsOptionsWrapper key={updatedQuestion.id}>
                <div>
                    <h6>Select your question type</h6>
                </div>
                <OptionsGrid>
                    <Option>
                        <OptionContent checked={updatedQuestion.type === 'text' ? true : false} onClick={() => setUpdatedQuestion({ ...updatedQuestion, type: 'text' })}>
                            <BsTextareaT size='32' />
                            <p>Text</p>
                        </OptionContent>
                    </Option>

                    <Option>
                        <OptionContent checked={updatedQuestion.type === 'multi choice' ? true : false} onClick={() => setUpdatedQuestion({ ...updatedQuestion, type: 'multi choice' })}>
                            <AiOutlineUnorderedList size='32' />
                            <p>Multiple Choice</p>
                        </OptionContent>
                    </Option>

                    <Option>
                        <OptionContent checked={updatedQuestion.type === 'choice' ? true : false} onClick={() => setUpdatedQuestion({ ...updatedQuestion, type: 'choice' })}>
                            <IoMdCheckmarkCircleOutline size='32' />
                            <p>Choice</p>
                        </OptionContent>
                    </Option>

                    <Option>
                        <OptionContent checked={updatedQuestion.type === 'email' ? true : false} onClick={() => setUpdatedQuestion({ ...updatedQuestion, type: 'email' })}>
                            <HiOutlineMail size='32' />
                            <p>Email</p>
                        </OptionContent>
                    </Option>

                    <Option>
                        <OptionContent checked={updatedQuestion.type === 'code' ? true : false} onClick={() => setUpdatedQuestion({ ...updatedQuestion, type: 'code' })}>
                            <BsCodeSlash size='32' />
                            <p>Code</p>
                        </OptionContent>
                    </Option>
                </OptionsGrid>

                <div className="field">
                    <div>
                        <h6>Your question</h6>
                    </div>
                    <div className="control">
                        <textarea
                            className="textarea"
                            placeholder="Write your question here..."
                            defaultValue={updatedQuestion.questionText || ''}
                            onChange={e => { setUpdatedQuestion({ ...updatedQuestion, questionText: e.target.value }); setShowError(false) }}></textarea>
                        {showError ? <p className="help is-danger mt-1">{errors.questions}</p> : null}
                    </div>
                </div>

                {
                    updatedQuestion.type === 'multi choice' || updatedQuestion.type === 'choice' ? (
                        <div className='field mt-4 mb-4'>
                            {
                                updatedQuestion.options.map((option, index) => (
                                    <div key={option.id} style={{ display: 'flex', alignItems: 'end', marginBottom: '16px' }}>
                                        <div style={{ width: '100%' }}>
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Type an option"
                                                defaultValue={option.text || ''}
                                                onChange={e => handleOptionChange(option.id, e.target.value)}
                                            />
                                            {showOptionError ? <p className="help is-danger mt-1">{errors.option}</p> : null}
                                        </div>
                                        {index === 0 ? null : (
                                            <div
                                                onClick={removeInput.bind(this, option.id)}
                                                style={{
                                                    backgroundColor: '#ffeae8',
                                                    marginLeft: '16px',
                                                    cursor: 'pointer',
                                                    borderRadius: '4px',
                                                    width: '40px',
                                                    height: '40px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                <AiOutlineDelete color='#e74c3c' size='20' />
                                            </div>
                                        )}
                                    </div>
                                ))
                            }
                            <Button size='tiny' light fit='stretched' onClick={appendInput}>
                                <MdAdd size='20' className='mr-2' color='#1C65E3' />
                                <span>Add an option</span>
                            </Button>
                        </div>
                    ) : null
                }

                <div className="field">
                    <div>
                        <h6>Set question settings</h6>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', marginRight: '8px' }}>
                            <input
                                type="checkbox"
                                id="require"
                                defaultChecked={updatedQuestion.isRequired}
                                onChange={() => setUpdatedQuestion({ ...updatedQuestion, isRequired: !updatedQuestion.isRequired })} />
                            <label htmlFor="require">Toggle</label>
                        </div>
                        <div>
                            <p>Require candidates to answer this question</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', marginRight: '8px' }}>
                            <input
                                type="checkbox"
                                id="limit"
                                defaultChecked={updatedQuestion.isLimited}
                                onChange={() => setUpdatedQuestion({ ...updatedQuestion, isLimited: !updatedQuestion.isLimited })} />
                            <label htmlFor="limit">Toggle</label>
                        </div>
                        <div>
                            <p>Set answer time limit</p>
                        </div>
                    </div>
                    {updatedQuestion.isLimited ?
                        <input
                            className="input"
                            type="text"
                            placeholder="Time limit"
                            defaultValue={updatedQuestion.limit}
                            onChange={e => setUpdatedQuestion({ ...updatedQuestion, limit: e.target.value })}
                            style={{ width: '50%' }} />
                        : null}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button primaty size='tiny' align='right' onClick={editQuestion}>Update</Button>
                    <span style={{ color: '#1C65E3', cursor: 'pointer' }} onClick={() => { setUpdatedQuestion({}); setshowEmptyState(true) }}>Cancel</span>
                </div>
            </QuestionsOptionsWrapper>
        </>
    )
}

export default EditQuestion
