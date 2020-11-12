import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Login } from '../../actions/authActions'

import Button from '../Button'
import {
    LoginContainer,
    LoginColOne,
    LogoContainer,
    LoginAssetSection,
    LoginColTwo,
    LoginContent,
    LoginHeading,
    LoginSubtext,
    LoginForm,
    Label,
    ForgotPassword
} from './style'
import Logo from '../../images/selfstarter-logo/selfstarter-logo.svg'
import LoginAsset from '../../images/login-page/login-asset.png'

const LoginComponent = ({ history }) => {

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const error = useSelector(state => state.error)
    const { user, isAuthenticated, token } = auth

    const validationSchema = Yup.object({
        username: Yup.string().trim().email('Please type your valid email address.').required('Please type your valid email address.'),
        password: Yup.string().trim().required('Please type your password'),
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        validateOnMount: true
    })

    const { handleBlur, touched, errors, handleChange, values, setFieldTouched, setErrors } = formik

    useEffect(() => {

        if (error.id === 'LOGIN_FAIL') {
            setErrors({ verified: null, authenticated: 'Please enter a valid email and password.' })
            setIsloading(false)
        }
        if (error.id === 'VERIFICATION_FAIL') {
            setErrors({ verified: 'We sent you a verification email, please check out your inbox', authenticated: null })
        }
        if (isAuthenticated && user != null && user.role === 'employer' && token != null) {
            history.push('/company-dashboard')
        }
        if (isAuthenticated && user != null && user.role === 'candidate' && token != null) {
            history.push('/employee-dashboard')
        }

    }, [error, user, history, isAuthenticated, setErrors, token])

    const [isLoading, setIsloading] = useState(false)

    const handleSubmit = () => {

        setFieldTouched('username', true, true)
        setFieldTouched('password', true, true)

        if (Object.keys(errors).length === 0) {
            setIsloading(true)
            dispatch(Login(values))
        }
    }

    return (
        <LoginContainer>

            <LoginColOne>
                <LogoContainer>
                    <img src={Logo} alt="Selfstarter Logo" />
                </LogoContainer>
                <LoginAssetSection>
                    <img src={LoginAsset} alt="Selfstarter Login" />
                </LoginAssetSection>
            </LoginColOne>

            <LoginColTwo>
                <LoginContent>
                    <LoginHeading>
                        Welcome back!<br />
                        Login to your account
                    </LoginHeading>
                    <LoginSubtext>
                        Don’t have an account with Selfstarter? <Link to='/register'>Registre Now</Link>
                    </LoginSubtext>

                    <LoginForm>
                        <Label>Email</Label>
                        <div className='control mb-4 has-icons-right'>
                            <input
                                className="input is-medium mt-2"
                                placeholder="Type your email address"
                                type="email"
                                onBlur={handleBlur('username')}
                                onChange={handleChange('username')}
                            />
                            {touched.username && errors.username ? <p className="help is-danger mt-1">{errors.username}</p> : null}
                        </div>

                        <Label>Password</Label>
                        <div className='control mb-4 has-icons-right'>
                            <input
                                className="input is-medium mt-2"
                                placeholder="Type your password"
                                type="password"
                                onBlur={handleBlur('password')}
                                onChange={handleChange('password')} />
                            {touched.password && errors.password ? <p className="help is-danger mt-1">{errors.password}</p> : null}
                        </div>

                        {errors.authenticated ? (
                            <div className="notification is-danger is-light">
                                {errors.authenticated}
                            </div>
                        ) : null}

                        <Button onClick={handleSubmit} size="block" loading={isLoading}>Login</Button>

                        <ForgotPassword>Forgot Password?</ForgotPassword>
                    </LoginForm>
                </LoginContent>
            </LoginColTwo>
        </LoginContainer>
    )
}

export default LoginComponent