import React from 'react'
import PhoneInput from 'react-phone-number-input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '../Button'
import { editProfile } from '../../actions/authActions'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

import { FieldControl, SettingsContainer } from './style'

toast.configure()

const AccountSettings = ({ user }) => {

    const dispatch = useDispatch()

    const validationSchema = Yup.object({
        fullName: Yup.string().trim().required('Please type your full name.'),
        phoneNumber: Yup.string().trim().required('Please enter your phone number.')
    })

    const formik = useFormik({
        initialValues: {
            ...user
        },
        validationSchema,
        validateOnMount: true,
        enableReinitialize: true
    })

    const { handleChange, handleBlur, touched, errors, setFieldTouched, values, setFieldValue } = formik

    const saveNewUserData = () => {
        if (errors.fullName || errors.phoneNumber) {
            setFieldTouched('fullName', true, true)
            setFieldTouched('phoneNumber', true, true)
            return
        }
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

            <FieldControl>
                <Button primary size='small' onClick={saveNewUserData}>Save</Button>
            </FieldControl>

            <Link to='/user/change-password' className='has-text-link'>Change your password</Link>
        </SettingsContainer>
    )
}

export default AccountSettings