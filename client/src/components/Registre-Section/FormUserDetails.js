import React, { useState } from 'react'
import axios from 'axios'

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { RegistreForm, Label, InputInlineSection } from './style'
import PrimaryBotton from '../Primary-Button'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const FormUserDetails = ({formik, nextStep, prevStep, registreForm, customHandleChange}) => {

    const { handleChange, errors, handleBlur, values, touched } = formik;

    const handleSubmit = () => {
        if (values.role === 'employer') {
            for (let i = 0; i <= 6; i++) {
                registreForm.current[i].focus()
                registreForm.current[i].blur()
            }
        } else {
            for (let i = 0; i <= 5; i++) {
                registreForm.current[i].focus()
                registreForm.current[i].blur()
            }
        }

        if (Object.keys(errors).length === 0) {
            nextStep()
        }

        //console.log(Object.keys(errors).length)
    }

    const [passwordShown, setPasswordShown] = useState(false);
    
    const togglePassword = () => {
        setPasswordShown(passwordShown ? false : true);
    }
 
    const prev = () => {
        prevStep()
    }

    const [loading] = useState(false)

    const checkEmail = () => {

        const email = values.email;

        axios.post('/users/email-check', {email})
             .then(res => {
                const { emailExist, msgBody } = res.data.message;

                if (emailExist) {
                    console.log(msgBody)
                } else {
                    console.log(msgBody)

                }

             })
             .catch(error => console.log(error.response.data))
    }

    return(
        <RegistreForm>
            <Label required>Full Name</Label>
            <div className="control">
                <input 
                    className="input is-medium mt-2 mb-2"
                    placeholder="Type your full name"
                    type="text"
                    onBlur={handleBlur('fullName')}
                    onChange={handleChange('fullName')}
                    defaultValue={values.fullName} />
                    {touched.fullName && errors.fullName ? <p className="help is-danger mb-2">{errors.fullName}</p> : null}
            </div>

            <div className="field is-horizontal" style={{justifyContent: 'space-between'}}>
                <InputInlineSection>
                    <Label required>Email</Label>
                    <div className={`control has-icons-right ${loading ? 'is-loading' : ''}`}>
                        <input 
                            className="input is-medium mt-2 mb-2" 
                            placeholder="Type a valid email address"
                            type="email"
                            onBlur={handleBlur('email')}
                            onKeyUp={checkEmail}
                            onChange={handleChange('email')}
                            defaultValue={values.email} />
                            {touched.email && errors.email ? <p className="help is-danger mb-2">{errors.email}</p> : null}
                    </div>
                </InputInlineSection>
                <InputInlineSection right>
                    <Label required>Password</Label>
                    <div className="control has-icons-right">
                        <input 
                            className="input is-medium mt-2 mb-4" 
                            placeholder="Type your password"
                            type={passwordShown ? "text" : "password"}
                            defaultValue={values.password}
                            onBlur={handleBlur('password')}
                            onChange={handleChange('password')} />
                        {
                            passwordShown ? 
                            (<AiOutlineEyeInvisible onClick={togglePassword} style={{fontSize: '.7rem', pointerEvents: 'painted', cursor: 'pointer'}} className="icon is-right" />)
                            :
                            (<AiOutlineEye onClick={togglePassword} style={{fontSize: '.7rem', pointerEvents: 'painted', cursor: 'pointer'}} className="icon is-right" />)
                        }
                        {/* <AiOutlineEye onClick={togglePassword} style={{fontSize: '.7rem', pointerEvents: 'painted', cursor: 'pointer'}} className="icon is-right" /> */}
                        {touched.password && errors.password ? <p className="help is-danger mb-2">{errors.password}</p> : null}
                    </div>
                </InputInlineSection>
            </div>

            <div className="field is-horizontal" style={{justifyContent: 'space-between'}}>
                {values.role === 'employer' ? (
                    <>
                        <InputInlineSection>
                            <Label required>Company Name</Label>
                            <div className="control">
                                <input 
                                    className="input is-medium mt-2 mb-4" 
                                    placeholder="Type your company name"
                                    type="text" 
                                    onBlur={handleBlur('companyName')}
                                    onChange={handleChange('companyName')}
                                    defaultValue={values.companyName} />
                                    {touched.companyName && errors.companyName ? <p className="help is-danger mb-2">{errors.companyName}</p> : null}
                            </div>
                        </InputInlineSection>
                    </>
                ) : (
                    <>
                        <InputInlineSection>
                            <Label required>Phone Number</Label>
                            <div className="control">
                                <PhoneInput
                                    className="input is-medium mt-2 mb-4"
                                    placeholder="Your phone number for safety purposes"
                                    defaultCountry="AE"
                                    onBlur={handleBlur('phoneNumber')}
                                    name="phoneNumber"
                                    onChange={(e) => customHandleChange('phoneNumber', e)}
                                    value={values.phoneNumber} />
                                    {touched.phoneNumber && errors.phoneNumber ? <p className="help is-danger mb-2">{errors.phoneNumber}</p> : null}
                            </div>
                        </InputInlineSection>
                    </>
                )}

                {values.role === 'employer' ? (
                    <>
                        <InputInlineSection right>
                            <Label required>Company Website</Label>
                            <div className="control">
                                <input 
                                    className="input is-medium mt-2 mb-4" 
                                    placeholder="Type your company website"
                                    type="url"
                                    onBlur={handleBlur('companyWebsite')}
                                    onChange={handleChange('companyWebsite')}
                                    defaultValue={values.companyWebsite} />
                                    {touched.companyWebsite && errors.companyWebsite ? <p className="help is-danger mb-2">{errors.companyWebsite}</p> : null}
                            </div>
                        </InputInlineSection>
                    </>
                ) : (
                    <>
                        <InputInlineSection right>
                            <Label>Current Job Title</Label>
                            <div className="control">
                                <input 
                                    className="input is-medium mt-2 mb-4" 
                                    placeholder="Type your job title"
                                    type="text"
                                    onChange={handleChange('currentJobRole')}
                                    defaultValue={values.currentJobRole} />
                            </div>
                        </InputInlineSection>
                    </>
                )}
            </div>

            {values.role === 'employer' ? (
                <>
                    <Label required>Phone Number</Label>
                    <div className="control">
                        <PhoneInput
                            className="input is-medium mt-2 mb-4"
                            placeholder="Your phone number for safety purposes"
                            defaultCountry="AE"
                            name="phoneNumber"
                            onChange={(e) => customHandleChange('phoneNumber', e)}
                            value={values.phoneNumber} />
                    </div>
                </>
            ) : null}

            <PrimaryBotton className="mr-4 mt-4" onClick={prev} size="medium" text="Previous" transparent />
            <PrimaryBotton onClick={handleSubmit} size="medium" text="Next" />
        </RegistreForm>
    )
}

export default FormUserDetails