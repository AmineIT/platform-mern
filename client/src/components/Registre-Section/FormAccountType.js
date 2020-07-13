import React, { useState } from 'react'

import { RegistreForm, Label, AccountType, Type, Loginlink } from './style'
import PrimaryBotton from '../Primary-Button'
import { EmployerIcon } from '../../images/registre-page/employerIcon'
import { CandidateIcon } from '../../images/registre-page/candidateIcon'

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
        <RegistreForm>

            <Label required>Who is this account for?</Label>

            <AccountType active={values.role === 'employer' ? active : !active} onClick={changeActive.bind(this, userType[0])}>
                <EmployerIcon color="#828282" />
                <Type>Employer</Type>
            </AccountType>

            <AccountType active={values.role === 'candidate' ? active : !active} onClick={changeActive.bind(this, userType[1])}>
                <CandidateIcon color="#828282" />
                <Type>Candidate</Type>
            </AccountType>

            <PrimaryBotton onClick={next} size="medium" text="Next" />

            <Loginlink>You have an account already? <a href="/" >Login</a></Loginlink>
        </RegistreForm>
    )
}

export default FormAccountType