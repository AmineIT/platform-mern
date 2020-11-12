import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { RegisterForm, Label, AccountType, Type, Loginlink } from './style'
import Button from '../Button'
import { EmployerIcon } from '../../images/register-page/employerIcon'
import { CandidateIcon } from '../../images/register-page/candidateIcon'

const FormAccountType = ({nextStep, customHandleChange, formik}) => {

    const { values } = formik;

    const [active] = useState(true);
    const [userType] = useState(['employer', 'candidate'])

    const changeActive = (userType) => {
        customHandleChange('role' ,userType)
    }

    const next = () => {
        nextStep()
    }

    return (
        <RegisterForm>

            <Label required>Who is this account for?</Label>

            <AccountType active={values.role === 'employer' ? active : !active} onClick={changeActive.bind(this, userType[0])}>
                <EmployerIcon color="#828282" />
                <Type>Employer</Type>
            </AccountType>

            <AccountType active={values.role === 'candidate' ? active : !active} onClick={changeActive.bind(this, userType[1])}>
                <CandidateIcon color="#828282" />
                <Type>Candidate</Type>
            </AccountType>

            <Button onClick={next} size="medium" >Next</Button>

            <Loginlink>You have an account already? <Link to="/login" >Login</Link></Loginlink>
        </RegisterForm>
    )
}

export default FormAccountType