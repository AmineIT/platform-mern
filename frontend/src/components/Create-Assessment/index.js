import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { createAssessment } from '../../actions/assessmentActions'

import {
    GlobalStyle,
    Container,
    LogoContainer,
    HeadingContainer,
    FieldControl,
    CTABlock,
    QuestionLibraryWrapper
} from './style'
import Button from '../Button'
import DashboardFooter from '../Dashboard-Footer'
import AssessmentSidebar from './AssessmentSidebar'
import QuestionLibrary from './QuestionLibraries'
import { RiArrowLeftLine } from 'react-icons/ri'

toast.configure()

const CreateAssessmentComponent = () => {

    let history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const questionsArray = useSelector(state => state.assessments.questions)

    const [isLoading, setIsLoading] = useState(false)
    const [isDraftLoading, setIsDraftLoading] = useState(false)
    const [showEmptyState, setShowEmptyState] = useState(true)
    const [questions, setQuestions] = useState(questionsArray)

    const validationSchema = Yup.object({
        assessmentTitle: Yup.string().trim().required('Please type assessment title.'),
        questions: Yup.string().trim().required('Please type your question.'),
        option: Yup.string().trim().required('Please add an option.')
    })

    const formik = useFormik({
        initialValues: {
            assessmentTitle: '',
            questions,
            createdBy: user._id,
            status: ''
        },
        validationSchema,
        validateOnMount: true
    })

    const { handleChange, handleBlur, touched, errors, values, setFieldValue, setFieldTouched } = formik
    const { assessmentTitle } = values

    useEffect(() => {
        if (questionsArray.length > 0) {
            setQuestions(questionsArray)
            setFieldValue('questions', questionsArray)
        }
    }, [questionsArray, setFieldValue])

    const publishAssessment = () => {
        if (values.assessmentTitle === '') {
            setFieldTouched('assessmentTitle', true)
            return
        }
        if (values.questions.length === 0) {
            alert('Please add a question to your assessment.')
            return
        }
        setIsLoading(true)
        values.status = 'published'
        dispatch(createAssessment(values))
        toast.success('Your assessment has been published!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
        setTimeout(() => {
            setIsLoading(false)
            history.push('/assessments')
        }, 2000)
    }

    const saveAsDraft = () => {
        if (values.assessmentTitle === '') {
            setFieldTouched('assessmentTitle', true)
            return
        }
        if (values.questions.length === 0) {
            alert('Please add a question to your assessment.')
            return
        }
        setIsDraftLoading(true)
        values.status = 'draft'
        dispatch(createAssessment(values))
        toast.info('Your assessment has been saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
        setTimeout(() => {
            setIsDraftLoading(false)
            history.push('/assessments')
        }, 2000)
    }

    return (
        <>
            <GlobalStyle />
            <Container>
                <LogoContainer>
                    <img src={`http://localhost:5000/${user.profileImage}`} alt='Company Logo' />
                </LogoContainer>

                <HeadingContainer>
                    <div onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>
                        <RiArrowLeftLine size='24' />
                        <span className='ml-1'>Back</span>
                    </div>
                    <h1>Create a new assessment</h1>
                </HeadingContainer>

                <FieldControl>
                    <div className="field">
                        <label className="label required">
                            <span>Assessment Title</span>
                            <span className='optional'>It won't show on the job ad</span>
                        </label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="e.g Marketing Skill Test"
                                name="assessmentTitle"
                                onChange={handleChange('assessmentTitle')}
                                onBlur={handleBlur('assessmentTitle')} />
                        </div>
                        {touched.assessmentTitle && errors.assessmentTitle ? <p className="help is-danger mt-1">{errors.assessmentTitle}</p> : null}
                    </div>
                </FieldControl>

                <FieldControl>
                    <div className="field">
                        <label className="label required">
                            <span>Questions Library</span>
                        </label>
                    </div>
                </FieldControl>

                <QuestionLibraryWrapper>

                    <AssessmentSidebar
                        assessmentTitle={assessmentTitle}
                        showEmptyState={showEmptyState}
                        setShowEmptyState={setShowEmptyState} />

                    <QuestionLibrary
                        errors={errors}
                        showEmptyState={showEmptyState}
                        setShowEmptyState={setShowEmptyState} />

                </QuestionLibraryWrapper>

                <CTABlock>
                    <Button
                        outline
                        size='small'
                        fit="stretched"
                        align='right'
                        onClick={saveAsDraft}
                        loading={isDraftLoading}>
                        Save as draft
                    </Button>

                    <Button
                        primary
                        size='small'
                        onClick={publishAssessment}
                        loading={isLoading}>
                        Publish
                    </Button>
                </CTABlock>
                <DashboardFooter />
            </Container>
        </>
    )
}

export default CreateAssessmentComponent