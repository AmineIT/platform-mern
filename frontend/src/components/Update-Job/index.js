import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from "react-router-dom"
import { updateJob, fetchJob } from '../../actions/jobActions'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import ReactQuill from 'react-quill'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import Calendar from 'react-calendar'
import { toast } from 'react-toastify'

import {
    GlobalStyle,
    Container,
    LogoContainer,
    HeadingContainer,
    FieldControl,
    Label,
    CheckBox,
    AssessmentSection,
    CTABlock
} from '../Create-Job/style'
import Button from '../Button'
import DashboardFooter from '../Dashboard-Footer'
import LoadingScreen from '../Loading-Screen'

import Logo from '../../images/selfstarter-logo/selfstarter-logo.svg'

import { RiArrowLeftLine } from 'react-icons/ri'
import { BsCalendar } from 'react-icons/bs'

import 'react-quill/dist/quill.snow.css'
import 'react-calendar/dist/Calendar.css'

toast.configure();

const UpdateJobComponent = () => {

    let history = useHistory()
    const ref = useRef()
    const { id } = useParams()
    const user = useSelector(state => state.auth.user)
    const companyJob = useSelector(state => state.jobs.companyJob)
    const dispatch = useDispatch()

    const editStyle = () => {
        let doc = document.documentElement;
        let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        if (top >= 1080 && Object.keys(companyJob).length !== 0) {
            ref.current.style.position = 'absolute';
            ref.current.style.bottom = '130px';
        } else {
            ref.current.style.position = 'fixed'
            ref.current.style.bottom = '30px'
        }
    }

    useEffect(() => {
        dispatch(fetchJob(id))
    }, [dispatch, id])

    useEffect(() => {
        window.addEventListener('scroll', editStyle)
        return () => {
            window.removeEventListener('scroll', editStyle)
        }
    }, [])

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            ['link', 'image'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
        'list', 'bullet', 'indent',
        'script',
        'link', 'image',
        'color', 'background',
        'font',
        'align',
        'clean'
    ]

    const [country, setCountry] = useState('')
    const [region, setRegion] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isDraftLoading, setIsDraftLoading] = useState(false)
    const [isArchivedLoading, setIsArchivedLoading] = useState(false)

    const onDateChange = (date) => {
        const timezone = moment.tz(date, 'Etc/UTC').format()
        date = moment(timezone).hours(1).format()
        formik.setFieldValue('expiredAt', date)
    }

    const selectCountry = (value) => {
        setCountry(value)
        formik.setFieldValue('country', value)
    }

    const selectRegion = (value) => {
        setRegion(value)
        formik.setFieldValue('city', value)
    }

    const validationSchema = Yup.object({
        jobTitle: Yup.string().trim().required('Please type job title.'),
        jobDescription: Yup.string().trim().required('Please type your job description.'),
        jobRequirement: Yup.string().trim().required('Please type your job requirments.'),
        jobDepartment: Yup.string().trim().required('Please select a department.'),
        employmentType: Yup.string().trim().required('Please select your employment type.'),
        country: Yup.string().trim().required('Please select a country.'),
        city: Yup.string().trim().required('Please select a city.')
    })

    const formik = useFormik({
        initialValues: {
            jobTitle: companyJob.jobTitle || '',
            jobDescription: companyJob.jobDescription || '',
            jobRequirement: companyJob.jobRequirement || '',
            minRequirement: companyJob.minRequirement || '',
            salary: companyJob.salary || '',
            salaryCurrency: companyJob.salaryCurrency || 'AED',
            showSalary: companyJob.showSalary || [],
            jobDepartment: companyJob.jobDepartment || '',
            employmentType: companyJob.employmentType || '',
            country: companyJob.country || '',
            city: companyJob.city || '',
            expiredAt: companyJob.expiredAt || '',
            createdBy: user._id,
            status: companyJob.status || '',
            jobId: id
        },
        validationSchema,
        validateOnMount: false,
        enableReinitialize: true
    })

    const { handleChange, handleBlur, touched, errors, setFieldTouched, values } = formik

    const publishJob = () => {
        if (Object.keys(errors).length > 0) {
            setFieldTouched('jobTitle', true)
            setFieldTouched('jobDescription', true)
            setFieldTouched('jobDepartment', true)
            setFieldTouched('jobRequirement', true)
            setFieldTouched('employmentType', true)
            setFieldTouched('country', true)
            setFieldTouched('city', true)
            return
        }
        values.status = 'published'
        if (values.expiredAt) {
            moment(values.expiredAt).toString()
        }
        setIsLoading(true)
        dispatch(updateJob(values))
        setTimeout(() => {
            setIsLoading(false)
            history.push('/jobs')
        }, 2000)
        toast.success('Your job has been published!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }

    const saveAsDraft = () => {
        if (Object.keys(errors).length > 0) {
            setFieldTouched('jobTitle', true)
            setFieldTouched('jobDescription', true)
            setFieldTouched('jobDepartment', true)
            setFieldTouched('jobRequirement', true)
            setFieldTouched('employmentType', true)
            setFieldTouched('country', true)
            setFieldTouched('city', true)
            return
        }
        values.status = 'draft'
        if (values.expiredAt) {
            moment(values.expiredAt).toString()
        }
        setIsDraftLoading(true)
        dispatch(updateJob(values))
        toast.info('Your job has been saved!', {
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
            history.push('/jobs')
        }, 2000)
    }

    const archiveJob = () => {
        values.status = 'archived'
        setIsArchivedLoading(true)
        dispatch(updateJob(values))
        toast.dark('Your job has been archived!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
        setTimeout(() => {
            setIsArchivedLoading(false)
            history.push('/jobs')
        }, 2000)
    }

    return (
        <>
            {Object.keys(companyJob).length !== 0 ? (
                <>
                    <GlobalStyle />
                    <Container>
                        <LogoContainer>
                            <img src={Logo} alt='Selfstarter Logo' />
                        </LogoContainer>

                        <HeadingContainer>
                            <div onClick={() => history.goBack({ state: null })} style={{ cursor: 'pointer' }}>
                                <RiArrowLeftLine size='24' />
                                <span className='ml-1'>Back</span>
                            </div>
                            <h1>Edit {values.jobTitle} job</h1>
                        </HeadingContainer>

                        <FieldControl>
                            <div className="field">
                                <label className="label required">Job Title</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="e.g Marketing Manager"
                                        name="jobTitle"
                                        defaultValue={values.jobTitle || ''}
                                        onChange={handleChange('jobTitle')}
                                        onBlur={handleBlur('jobTitle')} />
                                </div>
                                {touched.jobTitle && errors.jobTitle ? <p className="help is-danger mt-1">{errors.jobTitle}</p> : null}
                            </div>
                        </FieldControl>

                        <FieldControl>
                            <label className="label required">Job Description</label>
                            <ReactQuill
                                placeholder='Describe your job responsibilities...'
                                onChange={handleChange('jobDescription')}
                                onBlur={() => setFieldTouched('jobDescription')}
                                name="jobDescription"
                                value={values.jobDescription || ''}
                                formats={formats}
                                modules={modules} />
                            {touched.jobDescription && errors.jobDescription ? <p className="help is-danger mt-1">{errors.jobDescription}</p> : null}
                        </FieldControl>

                        <FieldControl>
                            <label className="label required">Job Requirements</label>
                            <ReactQuill
                                placeholder='Type your job requirements...'
                                onChange={handleChange('jobRequirement')}
                                onBlur={() => setFieldTouched('jobRequirement')}
                                name="jobRequirement"
                                value={values.jobRequirement || ''}
                                formats={formats}
                                modules={modules} />
                            {touched.jobRequirement && errors.jobRequirement ? <p className="help is-danger mt-1">{errors.jobRequirement}</p> : null}
                        </FieldControl>

                        <hr />

                        <FieldControl>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control is-expanded">
                                        <label className="label optional">Minimum Requirement</label>
                                        <div className="field is-narrow">
                                            <div className="select is-fullwidth">
                                                <select value={values.minRequirement} onChange={handleChange('minRequirement')} onBlur={handleBlur('minRequirement')} name='minRequirement'>
                                                    <option value='' >Select minimum requirements</option>
                                                    <option value='Not specified' >Not specified</option>
                                                    <option value='1 year' >1 year</option>
                                                    <option value='2 years - 3 years' >2 years - 3 years</option>
                                                    <option value='4 years - 5 years' >4 years - 5 years</option>
                                                    <option value='More than 5 years' >More than 5 years</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FieldControl>

                        <FieldControl>
                            <div className="field-body">
                                <div className="field">
                                    <label className="label optional">Salary</label>
                                    <div className="field has-addons">
                                        <div className="control">
                                            <span className="select">
                                                <select value={values.salaryCurrency} onChange={handleChange('salaryCurrency')} onBlur={handleBlur('salaryCurrency')} name='salaryCurrency'>
                                                    <option value='AED'>AED</option>
                                                    <option value='USD'>USD</option>
                                                    <option value='EURO'>EURO</option>
                                                </select>
                                            </span>
                                        </div>
                                        <div className="control is-expanded">
                                            <input
                                                className="input"
                                                type="text"
                                                name="salary"
                                                defaultValue={values.salary}
                                                onChange={handleChange('salary')}
                                                onBlur={handleBlur('salary')}
                                                placeholder="Enter Salary" />
                                        </div>
                                    </div>
                                    <label className="checkbox mt-4">
                                        <CheckBox onChange={handleChange('showSalary')} checked={values.showSalary && values.showSalary[0] === 'show' ? 'checked' : null} name='showSalary' type='checkbox' value='show' id='salary-ad' />
                                        <Label htmlFor='salary-ad'>Show on job ad</Label>
                                    </label>
                                </div>
                                <div className="field">
                                    <div className="control is-expanded">
                                        <label className="label required">Department</label>
                                        <div className="field is-narrow">
                                            <div className="select is-fullwidth">
                                                <select value={values.jobDepartment} onChange={handleChange('jobDepartment')} onBlur={handleBlur('jobDepartment')} name='jobDepartment'>
                                                    <option value=''>Select a department</option>
                                                    <option value='Business development'>Business development</option>
                                                    <option value='Engineering'>Engineering</option>
                                                    <option value='Finance'>Finance</option>
                                                    <option value='Human Resources'>Human Resources</option>
                                                    <option value='Marketing'>Marketing</option>
                                                    <option value='Operation'>Operation</option>
                                                    <option value='Product'>Product</option>
                                                    <option value='Sales'>Sales</option>
                                                </select>
                                            </div>
                                        </div>
                                        {touched.jobDepartment && errors.jobDepartment ? <p className="help is-danger mt-1">{errors.jobDepartment}</p> : null}
                                    </div>
                                </div>
                            </div>
                        </FieldControl>

                        <FieldControl>
                            <div className="field-body">
                                <div className="field">
                                    <div className='control is-expanded'>
                                        <label className="label required">Employment Type</label>
                                        <div className="field is-narrow">
                                            <div className="select is-fullwidth">
                                                <select value={values.employmentType} onChange={handleChange('employmentType')} onBlur={handleBlur('employmentType')} name='employmentType'>
                                                    <option value=''>Select an employment type</option>
                                                    <option value='Not specified'>Not specified</option>
                                                    <option value='Contract'>Contract</option>
                                                    <option value='Full time'>Full time</option>
                                                    <option value='Freelance'>Freelance</option>
                                                    <option value='Intership'>Internship</option>
                                                </select>
                                            </div>
                                        </div>
                                        {touched.employmentType && errors.employmentType ? <p className="help is-danger mt-1">{errors.employmentType}</p> : null}
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control is-expanded has-icons-right">
                                        <label className="label optional">Application Deadline</label>
                                        <div className="field is-narrow">
                                            <div className="dropdown is-right is-hoverable">
                                                <div className="dropdown-trigger">
                                                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu6">
                                                        <span>
                                                            {formik.values.expiredAt ?
                                                                moment(formik.values.expiredAt).format('dddd, MMMM Do YYYY') :
                                                                (companyJob.expiredAt ? moment(companyJob.expiredAt).format('dddd, MMMM Do YYYY') :
                                                                    'Select application deadline')}
                                                        </span>
                                                        <span className="icon is-small is-right">
                                                            <BsCalendar color='#1C65E3' />
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className="dropdown-menu" id="dropdown-menu6" role="menu">
                                                    <div className="dropdown-content">
                                                        <Calendar defaultValue={values.expiredAt} minDate={new Date()} value={new Date()} onChange={onDateChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FieldControl>

                        <FieldControl>
                            <div className="field-body">
                                <div className="field">
                                    <div className='control is-expended'>
                                        <label className="label required">Country</label>
                                        <div className="field is-narrow">
                                            <div className="select is-fullwidth">
                                                <CountryDropdown
                                                    showDefaultOption={true}
                                                    value={country || values.country}
                                                    onBlur={() => setFieldTouched('country')}
                                                    name='country'
                                                    onChange={selectCountry} />
                                            </div>
                                        </div>
                                        {touched.country && errors.country ? <p className="help is-danger mt-1">{errors.country}</p> : null}
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="control is-expanded">
                                        <label className="label required">City</label>
                                        <div className="field is-narrow">
                                            <div className="select is-fullwidth">
                                                <RegionDropdown
                                                    blankOptionLabel='No country selected.'
                                                    country={country || values.country}
                                                    onChange={selectRegion}
                                                    onBlur={() => setFieldTouched('city')}
                                                    name='city'
                                                    value={region || values.city} />
                                            </div>
                                        </div>
                                        {touched.city && errors.city ? <p className="help is-danger mt-1">{errors.city}</p> : null}
                                    </div>
                                </div>
                            </div>
                        </FieldControl>

                        <AssessmentSection>
                            <div>
                                <h1>Add an assessment to your application</h1>
                                <p>Focus on the most relevant questions to keep candidates motivated throughout the process.</p>
                                <Button light size='small' fit='stretched'>Add an assessment</Button>
                            </div>
                        </AssessmentSection>

                        <CTABlock ref={ref}>
                            {
                                values.status === 'published' ?
                                    (<Button
                                        outline
                                        size='small'
                                        fit="stretched"
                                        align='right'
                                        loading={isArchivedLoading}
                                        onClick={archiveJob}>
                                        Archive
                            </Button>) :
                                    (<Button
                                        outline
                                        size='small'
                                        fit="stretched"
                                        align='right'
                                        loading={isDraftLoading}
                                        onClick={saveAsDraft}>
                                        Save as draft
                            </Button>)
                            }

                            <Button
                                primary
                                size='small'
                                onClick={publishJob}
                                loading={isLoading}>
                                Publish
                        </Button>
                        </CTABlock>
                        <DashboardFooter />
                    </Container>
                </>
            ) : (<LoadingScreen />)}

        </>
    )
}

export default UpdateJobComponent