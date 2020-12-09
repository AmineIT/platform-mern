import React from 'react'
import { useSelector } from 'react-redux'

import QuestionCard from './QuestionCard'
import {
    AssessmentQuestionsWrapper,
    QuestionContainer,
    EmptyState,
    PreviewContainer
} from './style'


const AssessmentSidebar = ({ showEmptyState, setShowEmptyState, assessmentTitle }) => {

    const { questions } = useSelector(state => state.assessments)

    return (
        <AssessmentQuestionsWrapper>
            <QuestionContainer>
                <div style={{ maxHeight: '550px' }}>
                    <div>
                        <h5>Assessment Questions {questions.length !== 0 ? `(${questions.length})` : ''}</h5>
                    </div>

                    {questions.length === 0 ?
                        (
                            <EmptyState>
                                <p>There's no questions yet.</p>
                            </EmptyState>
                        )
                        : (
                            <PreviewContainer>
                                {
                                    questions.map((question, index) => (
                                        <div key={question.id}>
                                            <QuestionCard
                                                index={index}
                                                showEmptyState={showEmptyState}
                                                setShowEmptyState={setShowEmptyState}
                                                question={question}
                                                assessmentTitle={assessmentTitle} />
                                        </div>
                                    )
                                    )
                                }
                            </PreviewContainer>
                        )}
                </div>
            </QuestionContainer>
        </AssessmentQuestionsWrapper>
    )
}

export default AssessmentSidebar
