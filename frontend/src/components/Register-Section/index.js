import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
    RegisterContainer,
    RegisterColOne,
    LogoContainer,
    RegisterAssetSection,
    RegisterColTwo,
    RegisterContent,
    RegisterHeading,
    RegisterSubtext,
    StepsDisplay
} from './style'

import Logo from '../../images/selfstarter-logo/selfstarter-logo.svg'
import RegisterAsset from '../../images/register-page/register-asset.svg'

import FormUserDetails from './FormUserDetails'
import FormPersonalDetails from './FormPersonalDetails'
import FormAccountType from './FormAccountType'
import RegisterSuccess from './RegistreSuccess'

const RegisterComponent = ({ history }) => {

    const auth = useSelector(state => state.auth)
    const { user, isAuthenticated, token } = auth

    useEffect(() => {
        if (isAuthenticated && user != null && user.role === 'employer' && token != null) {
            history.push('/company-dashboard')
        }
        if (isAuthenticated && user != null && user.role === 'candidate' && token != null) {
            history.push('/employee-dashboard')
        }
    }, [user, isAuthenticated, token, history])

    const [step, setStep] = useState(1)

    const Form = useRef()

    const validationSchema = Yup.object({
        fullName: Yup.string().trim().required('Please type your full name.'),
        email: Yup.string().trim().email('Please enter a valid email address.').required('Please type your valid email address.'),
        password: Yup.string().trim().required('Please type your password').min(6, 'Password must be more than 6 characters long.'),
        companyName: Yup.string().when('role', {
            is: 'employer',
            then: Yup.string().trim().required('Please type your company name.')
        }),
        companyWebsite: Yup.string().when('role', {
            is: 'employer',
            then: Yup.string().matches('^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?.)+[a-zA-Z]{2,6}$', 'Please type a valid url.').required('Please type your company website.')
        }),
        phoneNumber: Yup.number().positive('Type a valid phone number.').required('Type a valid phone number.')
    })

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            role: 'employer',
            companyName: '',
            companyWebsite: '',
            phoneNumber: '',
            currentJobRole: '',
            profileImage: '',
            aboutMe: ''
        },
        validationSchema,
        validateOnMount: true
    })

    const nextStep = () => {
        setStep(step + 1)
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    const { handleSubmit } = formik;


    const customHandleChange = (key, value) => {
        formik.setFieldValue(key, value)
    }

    const renderSwitch = (step) => {
        switch (step) {
            case 1:
                return (
                    <div className={`${step === 1 ? 'fade-component-one' : null}`}>
                        <FormAccountType
                            nextStep={nextStep}
                            customHandleChange={customHandleChange}
                            handleSubmit={handleSubmit}
                            formik={formik} />
                    </div>
                )
            case 2:
                return (
                    <div className={`${step === 2 ? 'fade-component-two' : null}`}>
                        <FormUserDetails
                            nextStep={nextStep}
                            prevStep={prevStep}
                            customHandleChange={customHandleChange}
                            Form={Form}
                            formik={formik} />
                    </div>
                )
            case 3:
                return (
                    <div className={`${step === 3 ? 'fade-component-three' : null}`}>
                        <FormPersonalDetails
                            prevStep={prevStep}
                            nextStep={nextStep}
                            customHandleChange={customHandleChange}
                            formik={formik} />
                    </div>
                )
            case 4:
                return (
                    <RegisterSuccess formik={formik} history={history} />
                )
            default: return null
        }
    }

    return (
        <RegisterContainer>
            {step !== 4 ? (
                <StepsDisplay>
                    <span className='step1 active'></span>
                    <span className={'step2 ' + (step === 2 || step === 3 ? 'active' : '')}></span>
                    <span className={'step3 ' + (step === 3 ? 'active' : '')}></span>
                    <span>Step {step}/3</span>
                </StepsDisplay>
            ) : null}
            <RegisterColOne>
                <LogoContainer>
                    <img src={Logo} alt="Selfstarter Logo" />
                </LogoContainer>
                <RegisterAssetSection>
                    <img src={RegisterAsset} alt="Selfstarter Register Asset" />
                </RegisterAssetSection>
            </RegisterColOne>

            <RegisterColTwo>
                {step !== 4 ? (
                    <RegisterContent>
                        <RegisterHeading>Get Your Account in Few Seconds!</RegisterHeading>
                        <RegisterSubtext>This information will help us serve you better.</RegisterSubtext>
                    </RegisterContent>
                ) : null}

                <form ref={Form}>
                    {renderSwitch(step)}
                </form>
            </RegisterColTwo>
        </RegisterContainer>
    )
}

export default RegisterComponent