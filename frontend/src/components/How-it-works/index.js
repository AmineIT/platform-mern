import React from 'react'
import { HowItWorksContainer, Heading, Subtext, Steps, Step, Icon, StepHeading } from './style'

import JobIcon from '../../images/home-page/job-icon.svg'
import AssessmentIcon from '../../images/home-page/assessment-icon.svg'
import ResultIcon from '../../images/home-page/result-icon.svg'

const HowItWorks = () => {
    return (
        <HowItWorksContainer>
            <Heading>How it works</Heading>
            <Subtext>Step away from resumes and start chasing real results.</Subtext>

            <Steps>
                <Step>
                    <Icon>
                        <img src={JobIcon} alt='Selfstarter Job'/>
                    </Icon>
                    <StepHeading>Create Job Post</StepHeading>
                    <p>Signup and post your job.<br/> It only takes a minute.</p>
                </Step>

                <Step>
                    <Icon>
                        <img src={AssessmentIcon} alt='Selfstarter Job Assessment'/>
                    </Icon>
                    <StepHeading>Setup Assessment</StepHeading>
                    <p>Build a custom test to evaluate <br/>your candidates thoroughly.</p>
                </Step>

                <Step>
                    <Icon>
                        <img src={ResultIcon} alt='Selfstarter Job Assessment Results'/>
                    </Icon>
                    <StepHeading>See Test Scores</StepHeading>
                    <p>Take control of determining who is <br/> worthy enough to be interviewed.</p>
                </Step>
            </Steps>
        </HowItWorksContainer>
    )
}

export default HowItWorks