import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import CreateQuestion from './CreateQuestion'
import EditQuestion from './EditQuestion'

import { Questions, EmptyState } from './style'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import Button from '../Button'

const QuestionLibrary = ({ errors, setShowEmptyState, showEmptyState }) => {

    const assessments = useSelector(state => state.assessments)
    const edit = useSelector(state => state.assessments.edit)

    const questionDetails = assessments.questionDetails ? assessments.questionDetails : {}
    const [updatedQuestion, setUpdatedQuestion] = useState(questionDetails)

    useEffect(() => {
        if (questionDetails.length > 0) {
            setUpdatedQuestion(questionDetails[0])
        }
    }, [questionDetails])

    return (
        <Questions>
            <div>
                <h5>{edit ? 'Edit' : 'Create'} Question</h5>
            </div>
            {showEmptyState ? (
                <EmptyState>
                    <AiOutlineUnorderedList color='#1C65E3' size='45' />
                    <h4>Start by adding the first question</h4>
                    <p>A simple multiple choice or text question first enhances candidate engagement.</p>
                    <Button light size='small' onClick={() => { setShowEmptyState(false); setUpdatedQuestion({}) }}>Add question</Button>
                </EmptyState>
            ) : Object.keys(updatedQuestion).length === 0 ? (
                <CreateQuestion errors={errors} setshowEmptyState={setShowEmptyState} />
            ) : (
                        updatedQuestion ? (
                            <EditQuestion
                                errors={errors}
                                setshowEmptyState={setShowEmptyState}
                                updatedQuestion={updatedQuestion}
                                setUpdatedQuestion={setUpdatedQuestion} />
                        ) : null
                    )}
        </Questions>
    )
}

export default QuestionLibrary
