import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { fetchAssessment, addQuestionForEditing, updateAssessment } from '../../actions/assessmentActions'

import {
    GlobalStyle,
    Container,
    LogoContainer,
    HeadingContainer,
    FieldControl,
    CTABlock,
    QuestionLibraryWrapper
} from '../Create-Assessment/style'
import Button from '../Button'
import DashboardFooter from '../Dashboard-Footer'
import AssessmentSidebar from './AssessmentSidebar'
import QuestionLibrary from './QuestionLibraries'
import { RiArrowLeftLine } from 'react-icons/ri'
import LoadingScreen from '../Loading-Screen'

toast.configure()

const UpdateAssessmentComponent = () => {

    let history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()
    const { companyAssessment } = useSelector(state => state.assessments)
    const { assessmentTitle, questions, status, createdBy, _id } = companyAssessment
    const { user: { profileImage } } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(fetchAssessment(id))
    }, [dispatch])

    const [isLoading, setIsLoading] = useState(false)
    const [isDraftLoading, setIsDraftLoading] = useState(false)
    const [showEmptyState, setShowEmptyState] = useState(true)

    const validationSchema = Yup.object({
        assessmentTitle: Yup.string().trim().required('Please type assessment title.'),
        questions: Yup.string().trim().required('Please type your question.'),
        option: Yup.string().trim().required('Please add an option.')
    })

    const formik = useFormik({
        initialValues: {
            assessmentTitle,
            questions,
            createdBy,
            status,
            _id
        },
        validationSchema,
        validateOnMount: true
    })

    const { handleChange, handleBlur, touched, errors, values, setFieldTouched, setFieldValue } = formik

    useEffect(() => {
        if (Object.keys(companyAssessment).length > 0) {
            setFieldValue('assessmentTitle', assessmentTitle)
            setFieldValue('questions', questions)
            setFieldValue('status', status)
            setFieldValue('createdBy', createdBy._id)
            setFieldValue('_id', _id)
            dispatch(addQuestionForEditing(questions.map(question => question)))
        }
    }, [companyAssessment])

    const editAssessment = () => {
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
        dispatch(updateAssessment(values))
        toast.success('Your assessment has been edited!', {
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
        dispatch(updateAssessment(values))
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
        dispatch(updateAssessment(values))
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
        Object.keys(companyAssessment).length === 0 ? (
            <LoadingScreen />
        ) :
            <>
                <GlobalStyle />
                <Container>
                    <LogoContainer>
                        <img src={`http://localhost:5000/${profileImage}`} alt='Company Logo' />
                    </LogoContainer>

                    <HeadingContainer>
                        <div onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>
                            <RiArrowLeftLine size='24' />
                            <span className='ml-1'>Back</span>
                        </div>
                        <h1>Edit {values.assessmentTitle}</h1>
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
                                    defaultValue={values.assessmentTitle}
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

                        {
                            Object.keys(companyAssessment).length > 0 ? (
                                <>
                                    <AssessmentSidebar
                                        assessment={companyAssessment}
                                        showEmptyState={showEmptyState}
                                        setShowEmptyState={setShowEmptyState} />

                                    <QuestionLibrary
                                        errors={errors}
                                        assessment={companyAssessment}
                                        showEmptyState={showEmptyState}
                                        setShowEmptyState={setShowEmptyState} />
                                </>
                            ) : null
                        }

                    </QuestionLibraryWrapper>

                    <CTABlock>
                        {
                            status === 'published' ? (
                                <Button
                                    primary
                                    size='small'
                                    onClick={editAssessment}
                                    loading={isLoading}>
                                    Update
                                </Button>
                            ) : (
                                    <>
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
                                    </>
                                )
                        }
                    </CTABlock>
                    <DashboardFooter />
                </Container>
            </>
    )
}

export default UpdateAssessmentComponent