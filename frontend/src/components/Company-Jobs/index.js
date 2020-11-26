import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import AllJobs from './All-Jobs'
import DraftJobs from './Draft-Jobs'
import ArchivedJobs from './Archived-Jobs'
import PublishedJobs from './Published-Jobs'
import Button from '../Button'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { FlexWrapper, Heading } from './style'
import 'react-toastify/dist/ReactToastify.css'
import SearchField from '../Search-Component'
import SkeletonLoader from 'tiny-skeleton-loader-react'

const CompanyJobs = ({ jobs }) => {

    const [searchText, setSearchText] = useState('')
    const jobDetails = useSelector(state => state.jobs)
    const { isLoading } = jobDetails

    const filtredJobs = jobs.filter(job =>
        job.jobTitle.toLowerCase().includes(searchText.toLocaleLowerCase())
    )

    return (
        <>
            {
                isLoading ? (
                    <div style={{ marginTop: '60px' }}>
                        <SkeletonLoader width='100px' style={{ marginBottom: '5px' }} />
                        <SkeletonLoader width='300px' style={{ marginBottom: '20px' }} />
                        <SkeletonLoader height='40px' style={{ marginBottom: '5px' }} />
                        <SkeletonLoader height='40px' style={{ marginBottom: '5px' }} />
                        <SkeletonLoader height='40px' style={{ marginBottom: '5px' }} />
                        <SkeletonLoader height='40px' style={{ marginBottom: '5px' }} />
                    </div>
                ) : (
                        <>
                            <Heading>Selfstarter Jobs</Heading>
                            <Tabs>
                                <FlexWrapper>
                                    <TabList>
                                        <Tab>All jobs ({jobs.length})</Tab>
                                        <Tab>Published ({jobs.filter(job => job.status === 'published').length})</Tab>
                                        <Tab>Draft ({jobs.filter(job => job.status === 'draft').length})</Tab>
                                        <Tab>Archived ({jobs.filter(job => job.status === 'archived').length})</Tab>
                                    </TabList>
                                    <div>
                                        <Button size='small' to='/job/create'>Create new job</Button>
                                    </div>
                                </FlexWrapper>

                                <SearchField placeholder='Search for a job...' handleSearch={e => setSearchText(e.target.value)} />

                                <TabPanel>
                                    <AllJobs jobs={filtredJobs} />
                                </TabPanel>
                                <TabPanel>
                                    <PublishedJobs jobs={filtredJobs} />
                                </TabPanel>
                                <TabPanel>
                                    <DraftJobs jobs={filtredJobs} />
                                </TabPanel>
                                <TabPanel>
                                    <ArchivedJobs jobs={filtredJobs} />
                                </TabPanel>
                            </Tabs>
                        </>
                    )
            }
        </>
    )
}

export default CompanyJobs