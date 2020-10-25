import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { userAuth } from '../actions/authActions'

import RegistreComponent from '../components/Register-Section'

const RegistrePage = ({history, userAuth}) => {

    useEffect(() => {
        userAuth()
    }, [])

    return (
        <RegistreComponent history={history} />
    )
}

export default connect(null, { userAuth })(RegistrePage)