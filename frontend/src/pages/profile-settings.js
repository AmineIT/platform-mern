import React from 'react'

import DashboardLayout from '../components/Dashboard-Layout'
import ProfileSettingsComponent from '../components/Profile-Settings'

const ProfileSettingsPage = () => {
    return (
        <DashboardLayout active from='profile-settings'>
            <ProfileSettingsComponent />
        </DashboardLayout>
    )
}

export default ProfileSettingsPage