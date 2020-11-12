import React from 'react'

import { 
    AboutSection, 
    AboutHeading, 
    AboutSubtext,
    PlatformOverview,
    AboutAsset,
    MainAsset } from './style'

import AssetOne from '../../images/home-page/about-asset-1.png'
import AssetTwo from '../../images/home-page/about-asset-2.png'
import AssetThree from '../../images/home-page/dashboard.png'

const About = () => {
    return (
        <AboutSection>
            <AboutHeading>Shortlist talents based on real results</AboutHeading>
            <AboutSubtext>Resumes often don’t do justice in exposing commitment and quality. Set up deliverables for your job application and see who can keep it real.</AboutSubtext>

            <PlatformOverview>
                <AboutAsset>
                    <img src={AssetOne} alt='About Selfstarter' />
                </AboutAsset>
                <MainAsset>
                    <img src={AssetThree} alt='About Selfstarter' />
                </MainAsset>
                <AboutAsset secondAsset>
                    <img src={AssetTwo} alt='About Selfstarter' />
                </AboutAsset>
            </PlatformOverview>
        </AboutSection>
    )
}

export default About