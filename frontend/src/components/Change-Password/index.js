import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { editProfile } from '../../actions/authActions'
import { toast } from 'react-toastify'

import {
    LoginContainer,
    LoginColOne,
    LogoContainer,
    LoginAssetSection,
    LoginColTwo,
    LoginContent,
    LoginHeading,
    LoginForm,
    Label
} from '../Login-Section/style'
import Logo from '../../images/selfstarter-logo/selfstarter-logo.svg'
import Button from '../Button'
import Asset from '../../images/login-page/login-asset.png'
import { RiArrowLeftLine } from 'react-icons/ri'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

toast.configure()

const ChangePasswordComponent = () => {

    let history = useHistory()
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const validationSchema = Yup.object({
        password: Yup.string().trim().required('Please type your new password.').min(6, 'Password must be more than 6 characters long.').nullable(true),
        confirmPassword: Yup.string().trim().required('Please type confirm your new password.').oneOf([Yup.ref('password'), null], 'Passwords must match.'),
    })

    const formik = useFormik({
        initialValues: {
            ...user
        },
        validationSchema,
        validateOnMount: true
    })

    const { handleBlur, touched, errors, handleChange, values, setFieldTouched } = formik

    const [passwordShown, setPasswordShown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
        dispatch(editProfile(values))
        setTimeout(() => {
            toast.info('Your password has been updated!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
            setIsLoading(false)
            history.push('/profile-settings')
        }, 1500)
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

                    <LoginForm>
                        <Label>New password</Label>
                        <div className='control mb-4 has-icons-right'>
                            <input
                                className="input is-medium mt-2"
                                placeholder="Type a new password"
                                type={passwordShown ? "text" : "password"}
                                onBlur={handleBlur('password')}
                                onChange={handleChange('password')}
                            />
                            {
                                passwordShown ?
                                    (<AiOutlineEyeInvisible onClick={togglePassword} style={{ fontSize: '.7rem', pointerEvents: 'painted', cursor: 'pointer', top: '18px', right: '10px' }} className="icon is-right" />)
                                    :
                                    (<AiOutlineEye onClick={togglePassword} style={{ fontSize: '.7rem', pointerEvents: 'painted', cursor: 'pointer', top: '18px', right: '10px' }} className="icon is-right" />)
                            }
                            {touched.password && errors.password ? <p className="help is-danger mt-1">{errors.password}</p> : null}
                        </div>

                        <Label>Confirm new password</Label>
                        <div className='control mb-4'>
                            <input
                                className="input is-medium mt-2"
                                placeholder="Confirm your new password"
                                type="password"
                                onBlur={handleBlur('confirmPassword')}
                                onChange={handleChange('confirmPassword')}
                            />
                            {touched.confirmPassword && errors.confirmPassword ? <p className="help is-danger mt-1">{errors.confirmPassword}</p> : null}
                        </div>

                        <Button size="block" onClick={resetPassword} loading={isLoading}>Reset my password</Button>
                    </LoginForm>
                </LoginContent>
            </LoginColTwo>

        </LoginContainer>
    )
}

export default ChangePasswordComponent