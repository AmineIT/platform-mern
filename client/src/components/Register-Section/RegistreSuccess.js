import React from 'react'

import { RegisterContent, RegisterHeading, VerificationText } from './style'

const RegisterSuccess = ({formik}) => {
    const { values } = formik
    return (
        <RegisterContent style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '90vh'}}>
            <div>
                <RegisterHeading>Gongrats {values.fullName}! You're all set <span role="img" aria-label="emoji">🎉</span></RegisterHeading>
                <VerificationText>Check your email inbox please, to start using Selfstarter we need to verify your email. We've already sent out the verification link to: <b style={{textDecoration: 'underline'}}>{values.email}</b>, Please check it and confirm it's really you.</VerificationText>
                <p className="mt-3" style={{color: '#8588A1'}}>Didn't get the email? <span className="has-text-link">Send it again</span></p>
            </div>
        </RegisterContent>
    )
}

export default RegisterSuccess