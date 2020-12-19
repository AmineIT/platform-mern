import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { resetPassword } from '../../actions/authActions'

import {
    LoginContainer,
    LoginColOne,
    LogoContainer,
    LoginAssetSection,
    LoginColTwo,
    LoginContent,
    LoginHeading,
    LoginForm,
    Label,
    LoginSubtext
} from '../Login-Section/style'
import Logo from '../../images/selfstarter-logo/selfstarter-logo.svg'
import Button from '../Button'
import Asset from '../../images/login-page/login-asset.png'
import { RiArrowLeftLine } from 'react-icons/ri'

const ResetPasswordComponent = () => {

    let history = useHistory()
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)
    const auth = useSelector(state => state.auth)
    const inputRef = useRef()

    const validationSchema = Yup.object({
        email: Yup.string().trim().email('Please enter a valid email.').required('Please type your email associated with your account.')
    })

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema,
        validateOnMount: true
    })

    const { handleBlur, touched, errors, handleChange, values, setFieldTouched, setErrors } = formik

    useEffect(() => {
        if (error.id === 'RESET_PASSWORD_FAIL') {
            setErrors({ emailExist: 'This email does not exist, please enter a valid email address.' })
            setIsLoading(false)
        }
        if (auth.emailSent) {
            setErrors({ emailExist: '' })
            setIsLoading(false)
            inputRef.current.value = ''
        }
    }, [error, setErrors, auth])

    const [isLoading, setIsLoading] = useState(false)

    const checkEmail = () => {
        if (errors.email) {
            setFieldTouched('email', true, true)
            return
        }
        setIsLoading(true)
        dispatch(resetPassword(values))
    }

    return (
        <LoginContainer>

            <LoginColOne>
                <LogoContainer>
                    <img src={Logo} alt="Selfstarter Logo" />
                </LogoContainer>
                <LoginAssetSection>
                    <img src={Asset} alt="Selfstarter Asset" />
                </LoginAssetSection>
            </LoginColOne>


            <LoginColTwo>
                <LoginContent>
                    <div onClick={() => history.goBack()} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#7E8BA2' }}>
                        <RiArrowLeftLine size='24' />
                        <span className='ml-1'>Back</span>
                    </div>
                    <LoginHeading>
                        Reset Password
                    </LoginHeading>
                    <LoginSubtext>
                        Enter your email and we will send you there <br /> a link to reset your password
                    </LoginSubtext>

                    <LoginForm>
                        <Label>Email</Label>
                        <div className='control mb-4 has-icons-right'>
                            <input
                                className="input is-medium mt-2"
                                placeholder="Enter your email address"
                                type='email'
                                ref={inputRef}
                                onBlur={handleBlur('email')}
                                onChange={handleChange('email')}
                            />
                            {touched.email && errors.email ? <p className="help is-danger mt-1">{errors.email}</p> : null}
                        </div>

                        {errors.emailExist ? (
                            <div className="notification is-danger is-light">
                                {errors.emailExist}
                            </div>
                        ) : null}

                        {auth.emailSent ? (
                            <div className="notification is-success is-light">
                                We've sent you an email with the instructions to reset your password, please check your inbox.
                            </div>
                        ) : null}

                        <Button size="block" onClick={checkEmail} loading={isLoading}>Reset my password</Button>
                    </LoginForm>
                </LoginContent>
            </LoginColTwo>

        </LoginContainer>
    )
}

export default ResetPasswordComponent