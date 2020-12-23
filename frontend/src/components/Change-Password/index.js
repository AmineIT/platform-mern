import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from "react-router-dom"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { updatePassword } from '../../actions/authActions'

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
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

const ChangePasswordComponent = () => {

    const dispatch = useDispatch()
    const error = useSelector(state => state.error)
    const auth = useSelector(state => state.auth)
    const { token } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false)

    const validationSchema = Yup.object({
        password: Yup.string().trim().required('Please type your new password.').min(6, 'Password must be more than 6 characters long.'),
        confirmPassword: Yup.string().trim().required('Please confirm your new password.').oneOf([Yup.ref('password'), null], 'Passwords must match.')
    })

    const formik = useFormik({
        initialValues: {
            password: '',
            token
        },
        validationSchema,
        validateOnMount: true
    })

    const { handleBlur, touched, errors, handleChange, values, setFieldTouched, setErrors, setFieldValue } = formik

    useEffect(() => {
        if (error.id === 'UPDATE_PASSWORD_FAIL') {
            setErrors({ userExist: error.msg.errorMessage })
            setIsLoading(false)
        }
        if (auth.emailSent) {
            setErrors({ emailExist: '' })
            setIsLoading(false)
        }
    }, [error, setErrors, auth])

    const togglePassword = () => {
        setPasswordShown(passwordShown ? false : true)
    }

    const resetPassword = () => {
        if (errors.password || errors.confirmPassword) {
            setFieldTouched('password', true, true)
            setFieldTouched('confirmPassword', true, true)
            return
        }
        setIsLoading(true)
        dispatch(updatePassword(values))
        setFieldValue('password', '')
        setFieldValue('confirmPassword', '')
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
                    <LoginHeading>
                        Reset Your Password
                    </LoginHeading>
                    <LoginSubtext>
                        Once you reset your password you will be able to log in to your <br />
                        account and use our service to the maximum.
                    </LoginSubtext>

                    <LoginForm>
                        <Label>New password</Label>
                        <div className='control mb-4 has-icons-right'>
                            <input
                                className="input is-medium mt-2"
                                placeholder="Enter your new password"
                                type={passwordShown ? "text" : "password"}
                                value={values.password}
                                onBlur={handleBlur('password')}
                                onChange={handleChange('password')}
                            />
                            {
                                passwordShown ?
                                    (<AiOutlineEyeInvisible onClick={togglePassword} style={{ fontSize: '.7rem', pointerEvents: 'painted', cursor: 'pointer', top: '20px', right: '10px' }} className="icon is-right" />)
                                    :
                                    (<AiOutlineEye onClick={togglePassword} style={{ fontSize: '.7rem', pointerEvents: 'painted', cursor: 'pointer', top: '20px', right: '10px' }} className="icon is-right" />)
                            }
                            {touched.password && errors.password ? <p className="help is-danger mt-1">{errors.password}</p> : null}
                        </div>

                        <Label>Confirm new password</Label>
                        <div className='control mb-4 has-icons-right'>
                            <input
                                className="input is-medium mt-2"
                                placeholder="Confirm your new password"
                                type='password'
                                value={values.confirmPassword}
                                onBlur={handleBlur('confirmPassword')}
                                onChange={handleChange('confirmPassword')}
                            />
                            {touched.confirmPassword && errors.confirmPassword ? <p className="help is-danger mt-1">{errors.confirmPassword}</p> : null}
                        </div>

                        {errors.userExist ? (
                            <div className="notification is-danger is-light">
                                {errors.userExist}
                            </div>
                        ) : null}

                        {auth.emailSent ? (
                            <div className="notification is-success is-light">
                                Your password has been updated. now you can <Link to='/login'><b>log in</b></Link> to your account with the new password.
                            </div>
                        ) : null}

                        <Button size="block" onClick={resetPassword} loading={isLoading}>Reset my password</Button>
                    </LoginForm>
                </LoginContent>
            </LoginColTwo>

        </LoginContainer>
    )
}

export default ChangePasswordComponent