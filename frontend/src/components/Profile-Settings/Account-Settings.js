import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-number-input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '../Button'
import { editProfile } from '../../actions/authActions'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { FieldControl, SettingsContainer } from './style'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'

toast.configure()

const AccountSettings = ({ user }) => {

    const dispatch = useDispatch()
    const [showPasswordField, setShowPasswordField] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false)

    const validationSchema = Yup.object({
        fullName: Yup.string().trim().required('Please type your full name.'),
        phoneNumber: Yup.string().trim().required('Please enter your phone number.'),
        showPassword: Yup.boolean(),
        password: Yup.string().nullable(true).when('showPassword', {
            is: true,
            then: Yup.string().trim().required('Please type your new password.').min(6, 'Password must be more than 6 characters long.')
        }),
        confirmPassword: Yup.string().when('showPassword', {
            is: true,
            then: Yup.string().trim().required('Please confirm your new password.').oneOf([Yup.ref('password'), null], 'Passwords must match.')
        })
    })

    const formik = useFormik({
        initialValues: {
            ...user,
            showPassword: false
        },
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true,
    })

    const { handleChange, handleBlur, touched, errors, setFieldTouched, values, setFieldValue, setFieldError } = formik

    useEffect(() => {
        if (!showPasswordField) {
            setFieldError('password', '')
            setFieldError('confirmPassword', '')
        } else {
            setFieldError('password', 'Please type your new password.')
            setFieldError('confirmPassword', 'Please confirm your new password.')
            setFieldValue('password', null)
        }
    }, [showPasswordField, setFieldError, setFieldValue])

    const togglePassword = () => {
        setPasswordShown(passwordShown ? false : true)
    }

    const saveNewUserData = () => {
        if (errors.fullName || errors.phoneNumber) {
            setFieldTouched('fullName', true, true)
            setFieldTouched('phoneNumber', true, true)
            return
        }

        if (showPasswordField && (errors.password || errors.confirmPassword)) {
            setFieldTouched('password', true, true)
            setFieldTouched('confirmPassword', true, true)
            return
        }
        setShowPasswordField(false)
        dispatch(editProfile(values))
        toast.info('Your profile has been updated!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    }

    return (
        <SettingsContainer>
            <FieldControl>
                <div className="field-body">
                    <div className="field">
                        <label className="label">Full name</label>
                        <div className="control">
                            <input
                                className="input"
                                value={values.fullName}
                                onChange={handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                                type='text'
                                placeholder='Type your full name' />
                            {touched.fullName && errors.fullName ? <p className="help is-danger mt-1">{errors.fullName}</p> : null}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input
                                className="input"
                                value={user.email}
                                type='text'
                                readOnly
                                disabled />
                        </div>
                    </div>
                </div>
            </FieldControl>

            <FieldControl>
                <div className="field-body">
                    <div className="field">
                        <label className="label">Phone number</label>
                        <div className="control">
                            <PhoneInput
                                className="input"
                                placeholder="0500000000"
                                defaultCountry="AE"
                                onChange={e => setFieldValue('phoneNumber', e)}
                                onBlur={handleBlur('phoneNumber')}
                                value={values.phoneNumber} />
                            {touched.phoneNumber && errors.phoneNumber ? <p className="help is-danger mt-1">{errors.phoneNumber}</p> : null}
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Current job role</label>
                        <div className="control">
                            <input
                                className="input"
                                value={values.currentJobRole}
                                onChange={handleChange('currentJobRole')}
                                onBlur={handleBlur('currentJobRole')}
                                type='text'
                                placeholder='Enter your current job role' />
                        </div>
                    </div>
                </div>
            </FieldControl>

            {
                showPasswordField ? (
                    <FieldControl>
                        <div className="field-body">
                            <div className="field">
                                <label className="label">New password</label>
                                <div className="control has-icons-right">
                                    <input
                                        className="input"
                                        onChange={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        type={passwordShown ? "text" : "password"}
                                        placeholder='Enter your new password' />
                                    {
                                        passwordShown ?
                                            (<AiOutlineEyeInvisible onClick={togglePassword} style={{ fontSize: '.7rem', pointerEvents: 'painted', cursor: 'pointer', top: '5px' }} className="icon is-right" />)
                                            :
                                            (<AiOutlineEye onClick={togglePassword} style={{ fontSize: '.7rem', pointerEvents: 'painted', cursor: 'pointer', top: '5px' }} className="icon is-right" />)
                                    }
                                    {touched.password && errors.password ? <p className="help is-danger mt-1">{errors.password}</p> : null}
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Confirm new password</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        onChange={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        type='password'
                                        placeholder='Confirm your new password' />
                                    {touched.confirmPassword && errors.confirmPassword ? <p className="help is-danger mt-1">{errors.confirmPassword}</p> : null}
                                </div>
                            </div>
                        </div>
                    </FieldControl>
                ) : null
            }

            {
                !showPasswordField ? (
                    <p
                        className='has-text-link'
                        style={{ cursor: 'pointer', width: 'fit-content' }}
                        onClick={() => {
                            setShowPasswordField(!showPasswordField)
                            setFieldValue('showPassword', !showPasswordField)
                        }}>Change your password</p>
                ) : (
                        <p
                            className='has-text-link'
                            style={{ cursor: 'pointer', width: 'fit-content' }}
                            onClick={() => {
                                setShowPasswordField(!showPasswordField)
                                setFieldValue('showPassword', !showPasswordField)
                                setFieldValue('password', null)
                            }}>Cancel</p>
                    )
            }

            <FieldControl>
                <Button primary size='small' onClick={saveNewUserData}>Save</Button>
            </FieldControl>
        </SettingsContainer>
    )
}

export default AccountSettings