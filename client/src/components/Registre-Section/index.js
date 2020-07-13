import React, { useState, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { 
    RegisterContainer, 
    RegistreColOne, 
    LogoContainer, 
    RegistreAssetSection, 
    RegistreColTwo, 
    RegistreContent, 
    RegistreHeading,
    RegistreSubtext,
    StepsDisplay} from './style'

import Logo from '../../images/selfstarter-logo/selfstarter-logo.svg'
import RegistreAsset from '../../images/registre-page/registre-asset.svg'

import FormUserDetails from './FormUserDetails'
import FormPersonalDetails from './FormPersonalDetails'
import FormAccountType from './FormAccountType'

const RegistreComponent = () => {

    const registreForm = useRef()
    
    const validationSchema = Yup.object({
        fullName: Yup.string().trim().required('Please type your full name.'),
        email: Yup.string().trim().email('Please enter a valid email address.').required('Please type your valid email address.'),
        password: Yup.string().trim().required('Please type your password').min(6, 'Password must be more than 6 characters long.'),
        companyName: Yup.string().trim().required('Please type your company name.'),
        companyWebsite: Yup.string().matches('^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?.)+[a-zA-Z]{2,6}$','Please type a valid url.').required('Please type your company website.'),
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
            phoneNumber: '+971',
            currentJobRole: '',
            companyLogo: '',
            photoProfile: '',
            aboutMe: ''
        }, 
        onSubmit: values => {
            return values
        },
        validationSchema,
        validateOnMount: true
    })

    const [step, setStep] = useState(1)

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
        switch(step) {
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
                            registreForm={registreForm}
                            formik={formik} />
                    </div>
                )
            case 3:
                return (
                    <div className={`${step === 3 ? 'fade-component-three' : null}`}>
                        <FormPersonalDetails
                            prevStep={prevStep}
                            customHandleChange={customHandleChange}
                            formik={formik} />
                    </div>
                )
            default : return null
        }
    }

    return (
        <RegisterContainer>
            <StepsDisplay>
                <span className='step1 active'></span>
                <span className={'step2 ' + (step === 2 || step === 3 ? 'active' : '') }></span>
                <span className={'step3 ' + (step === 3 ? 'active' : '') }></span>
                <span>Step {step}/3</span>
            </StepsDisplay>
            <RegistreColOne>
                <LogoContainer>
                    <img src={Logo} alt="Selfstarter Logo" />
                </LogoContainer>
                <RegistreAssetSection>
                    <img src={RegistreAsset} alt="Selfstarter Registre Asset" />
                </RegistreAssetSection>
            </RegistreColOne>
        
            <RegistreColTwo>
                <RegistreContent>
                    <RegistreHeading>Get Your Account in Few Seconds!</RegistreHeading>
                    <RegistreSubtext>This information will help us serve you better.</RegistreSubtext>
                </RegistreContent>

                <form ref={registreForm}>
                    {renderSwitch(step)}
                </form>
            </RegistreColTwo>
        </RegisterContainer>
    )
}

export default RegistreComponent