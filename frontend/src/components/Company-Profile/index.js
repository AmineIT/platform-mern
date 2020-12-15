import React from 'react'
import { useSelector } from 'react-redux'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import CompanySettings from './CompanySettings'
import { Heading, FlexWrapper } from './style'

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
                    <p>Message Settings</p>
                </TabPanel>
                <TabPanel>
                    <p>Notifications</p>
                </TabPanel>
            </Tabs>
        </>
    )
}

export default CompanyProfileComponent