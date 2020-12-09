import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import SkeletonLoader from 'tiny-skeleton-loader-react'
import Published from './published'
import Draft from './draft'
import AllAssessments from './all-assessments'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { Heading, FlexWrapper } from './style'
import Button from '../Button'
import SearchField from '../Search-Component'

const CompanyAssessmentComponent = ({ assessments }) => {

    const [searchText, setSearchText] = useState('')
    const user = useSelector(state => state.auth.user)
    const assessmentDetails = useSelector(state => state.assessments)
    const { companyName } = user
    const { isLoading } = assessmentDetails

    const filtredAssessments = assessments.filter(assessment =>
        assessment.assessmentTitle.toLowerCase().includes(searchText.toLocaleLowerCase())
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
                            <Heading>{companyName} Assessments</Heading>
                            <Tabs>
                                <FlexWrapper>
                                    <TabList>
                                        <Tab>All assessments ({assessments.length})</Tab>
                                        <Tab>Published ({assessments.filter(assessments => assessments.status === 'published').length})</Tab>
                                        <Tab>Draft ({assessments.filter(assessments => assessments.status === 'draft').length})</Tab>
                                    </TabList>
                                    <div>
                                        <Button fit='stretched' size='small' to='/assessment/create'>Create assessment</Button>
                                    </div>
                                </FlexWrapper>

                                <SearchField placeholder='Search for an assessment...' handleSearch={e => setSearchText(e.target.value)} />

                                <TabPanel>
                                    <AllAssessments assessments={filtredAssessments} />
                                </TabPanel>
                                <TabPanel>
                                    <Published assessments={filtredAssessments} />
                                </TabPanel>
                                <TabPanel>
                                    <Draft assessments={filtredAssessments} />
                                </TabPanel>
                            </Tabs>
                        </>
                    )
            }
        </>
    )
}

export default CompanyAssessmentComponent