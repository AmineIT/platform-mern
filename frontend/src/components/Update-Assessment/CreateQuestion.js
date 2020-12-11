import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addQuestionFromEditing } from '../../actions/assessmentActions'
import { v4 as uuidv4 } from 'uuid'

import { QuestionsOptionsWrapper, OptionsGrid, Option, OptionContent } from '../Create-Assessment/style'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { BsTextareaT, BsCodeSlash } from 'react-icons/bs'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { MdAdd } from 'react-icons/md'
import { HiOutlineMail } from 'react-icons/hi'
import { AiOutlineDelete } from 'react-icons/ai'
import Button from '../Button'

const CreateQuestion = ({ errors }) => {

    const dispatch = useDispatch()
    const [isLimitChecked, setIsLimitChecked] = useState(true)
    const [isRequireChecked, setIsRequireChecked] = useState(true)
    const [timer, setTimer] = useState(false)
    const [type, setType] = useState('text')
    const [showError, setShowError] = useState(false)
    const [showOptionError, setShowOptionError] = useState(false)
    const types = { type }
    const [question, setQuestion] = useState({
        id: uuidv4(),
        questionText: '',
        options: [{
            id: uuidv4(),
            text: ''
        }],
        type: 'text',
        isLimited: false,
        limit: '5',
        isRequired: true,
    })

    const appendInput = () => {
        const newInput = { id: uuidv4(), text: '' }
        setQuestion({ ...question, options: [...question.options, newInput] })
    }

    const removeInput = (id) => {
        const removedArray = question.options.filter(option => option.id !== id)
        setQuestion({ ...question, options: [...removedArray] })
    }

    const createQuestion = () => {
        if (question.questionText === '') {
            setShowError(true)
            return
        }
        if (question.options[0].text === '' && question.type !== 'text' && question.type !== 'email' && question.type !== 'code') {
            setShowOptionError(true)
            return
        }
        dispatch(addQuestionFromEditing(question))
        setType('text')
        setTimer(false)
        setIsLimitChecked(true)
        setIsRequireChecked(true)
        setQuestion({
            id: uuidv4(),
            questionText: '',
            options: [{
                id: uuidv4(),
                text: ''
            }],
            type: 'text',
            isLimited: false,
            limit: '5',
            isRequired: true,
        })
    }

    const handleOptionChange = (id, value) => {
        setShowOptionError(false)
        question.options.map(option => {
            if (option.id === id) {
                option.text = value
            }
        })
    }

    return (
        <>
            <QuestionsOptionsWrapper>
                <div>
                    <h6>Select your question type</h6>
                </div>
                <OptionsGrid>
                    <Option>
                        <OptionContent checked={types.type === 'text' ? true : false} onClick={() => { setType('text'); setQuestion({ ...question, type: 'text' }) }}>
                            <BsTextareaT size='32' />
                            <p>Text</p>
                        </OptionContent>
                    </Option>

                    <Option>
                        <OptionContent checked={types.type === 'multi choice' ? true : false} onClick={() => { setType('multi choice'); setQuestion({ ...question, type: 'multi choice' }) }}>
                            <AiOutlineUnorderedList size='32' />
                            <p>Multiple Choice</p>
                        </OptionContent>
                    </Option>

                    <Option>
                        <OptionContent checked={types.type === 'choice' ? true : false} onClick={() => { setType('choice'); setQuestion({ ...question, type: 'choice' }) }}>
                            <IoMdCheckmarkCircleOutline size='32' />
                            <p>Choice</p>
                        </OptionContent>
                    </Option>

                    <Option>
                        <OptionContent checked={types.type === 'email' ? true : false} onClick={() => { setType('email'); setQuestion({ ...question, type: 'email' }) }}>
                            <HiOutlineMail size='32' />
                            <p>Email</p>
                        </OptionContent>
                    </Option>

                    <Option>
                        <OptionContent checked={types.type === 'code' ? true : false} onClick={() => { setType('code'); setQuestion({ ...question, type: 'code' }) }}>
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
                            value={question.questionText}
                            onChange={e => { setQuestion({ ...question, questionText: e.target.value }); setShowError(false) }}></textarea>
                        {showError ? <p className="help is-danger mt-1">{errors.questions}</p> : null}
                    </div>
                </div>

                {
                    question.type === 'multi choice' || question.type === 'choice' ? (
                        <div className='field mt-4 mb-4'>
                            {
                                question.options.map((option, index) => (
                                    <div key={option.id} style={{ display: 'flex', alignItems: 'end', marginBottom: '16px' }}>
                                        <div style={{ width: '100%' }}>
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Type an option"
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
                                value={isRequireChecked}
                                checked={isRequireChecked}
                                onChange={() => { setIsRequireChecked(!isRequireChecked); setQuestion({ ...question, isRequired: !isRequireChecked }) }} />
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
                                value={isLimitChecked}
                                checked={!isLimitChecked}
                                onChange={() => { setIsLimitChecked(!isLimitChecked); setTimer(!timer); setQuestion({ ...question, isLimited: isLimitChecked }) }} />
                            <label htmlFor="limit">Toggle</label>
                        </div>
                        <div>
                            <p>Set answer time limit</p>
                        </div>
                    </div>
                    {timer ?
                        <input
                            className="input"
                            type="text"
                            placeholder="Time limit"
                            value={question.limit}
                            onChange={e => setQuestion({ ...question, limit: e.target.value })}
                            style={{ width: '50%' }} />
                        : null}
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button primaty size='tiny' align='right' onClick={createQuestion}>Create</Button>
                    <span style={{ color: '#1C65E3', cursor: 'pointer' }}>Cancel</span>
                </div>
            </QuestionsOptionsWrapper>
        </>
    )
}

export default CreateQuestion