import React, { useEffect } from 'react'

import AllJobs from './All-Jobs'
import DraftJobs from './Draft-Jobs'
import ArchivedJobs from './Archived-Jobs'
import Button from '../Button'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { FlexWrapper } from './style'
import TableDataHeading from '../Table-Data-Heading'
import 'react-toastify/dist/ReactToastify.css'

const CompanyJobs = () => {

    return (
        <>
            <Tabs>
                <FlexWrapper>
                    <TabList>
                        <Tab>All jobs</Tab>
                        <Tab>Draft</Tab>
                        <Tab>Archived</Tab>
                    </TabList>
                    <div>
                        <Button size='small' to='/job/create'>Create new job</Button>
                    </div>
                </FlexWrapper>

                <TableDataHeading />
                <TabPanel>
                    <AllJobs />
                </TabPanel>
                <TabPanel>
                    <DraftJobs />
                </TabPanel>
                <TabPanel>
                    <ArchivedJobs />
                </TabPanel>
            </Tabs>
        </>
    )
}

export default CompanyJobs