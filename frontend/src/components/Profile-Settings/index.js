import React from 'react'
import { useSelector } from 'react-redux'

import AccountSettings from './Account-Settings'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Heading, FlexWrapper } from './style'

const ProfileSettingsComponent = () => {

    const { user } = useSelector(state => state.auth)

    return (
        <>
            <Heading>Account Settings</Heading>
            <Tabs>
                <FlexWrapper>
                    <TabList>
                        <Tab>Account Settings</Tab>
                    </TabList>
                </FlexWrapper>

                <TabPanel>
                    <AccountSettings user={user} />
                </TabPanel>
            </Tabs>
        </>
    )
}

export default ProfileSettingsComponent