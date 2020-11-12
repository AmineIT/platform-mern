import React, {useState, useEffect} from 'react'

import { SuccessContent, RegisterHeading, VerificationText } from './style'

const RegisterSuccess = ({formik, history}) => {

    const { values } = formik
    let [time, setTime] = useState(5)

    const timer = setInterval(() => {
        time--;
        setTime(time)
        if (time <= 0) {
            history.push(`/login`)
            clearInterval(timer)
        }
    }, 1000)

    useEffect(() => {
        return () => clearInterval(timer)
    })

    return (
        <SuccessContent>
            <div>
                <RegisterHeading>Gongrats {values.fullName}! You're all set <span role="img" aria-label="emoji">🎉</span></RegisterHeading>
                <VerificationText>Check your email inbox please, we've already sent out the verification link to: <b style={{textDecoration: 'underline'}}>{values.email}</b> . Please check it and confirm it's really you.</VerificationText>
                <p className="mt-3 has-text-link">You will be redirected to the login page after {time} sec.</p>
            </div>
        </SuccessContent>
    )
}

export default RegisterSuccess