import React from 'react'
import { useSelector } from 'react-redux'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import CompanySettings from './CompanySettings'
import { Heading, FlexWrapper } from './style'
import MessageSettings from './MessageSettings';
import Notifications from './Notifications';

const CompanyProfileComponent = () => {

    const { user } = useSelector(state => state.auth)
    const { companyName } = user

    return (
        <>
            <Heading>{companyName} Settings</Heading>
            <Tabs>
                <FlexWrapper>
                    <TabList>
                        <Tab>Company Settings</Tab>
                        <Tab>Message Settings</Tab>
                        <Tab>Notifications</Tab>
                    </TabList>
                </FlexWrapper>

                <TabPanel>
                    <CompanySettings user={user} />
                </TabPanel>
                <TabPanel>
                    <MessageSettings user={user} />
                </TabPanel>
                <TabPanel>
                    <Notifications user={user} />
                </TabPanel>
            </Tabs>
        </>
    )
}

export default CompanyProfileComponent