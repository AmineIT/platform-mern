import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userAuth } from '../actions/authActions'

import DashboardLayout from '../components/Dashboard-Layout'
import ProfileSettingsComponent from '../components/Profile-Settings'

const ProfileSettingsPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userAuth())
    }, [dispatch])

    return (
        <DashboardLayout active from='profile-settings'>
            <ProfileSettingsComponent />
        </DashboardLayout>
    )
}

export default ProfileSettingsPage