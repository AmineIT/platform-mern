import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { userAuth } from '../actions/authActions'

import Layout from '../components/Layout/index'
import HeroBanner from '../components/Hero-Banner'
import About from '../components/About'
import HowItWorks from '../components/How-it-works'
import CTABlock from '../components/CTA-Block'

import Features from '../components/Features'
import BannerImg from '../images/home-page/hero-image.png'
import FeatureBG from '../images/home-page/feature-1-bg.png'
import FeatureOne from '../images/home-page/feature-1.png'
import FeatureBGTwo from '../images/home-page/feature-2-bg.png'
import FeatureTwo from '../images/home-page/feature-2.png'
import FeatureBGThree from '../images/home-page/feature-3-bg.png'
import FeatureThree from '../images/home-page/feature-3.png'
import FeatureBGFour from '../images/home-page/feature-4-bg.png'
import FeatureFour from '../images/home-page/feature-4.png'

const HomePage = ({userAuth, isLoading}) => {

    useEffect(() => {
        userAuth();
    }, [])

    return (
        <Layout>
            <HeroBanner 
                heading={<>Let applicants<br/> demonstrate their skills</>} 
                subtext="See real results before you consider a talent and shortlist effectively to drill into quality candidates. Change your first touchpoint from a resume to a skill test."
                heroImg={BannerImg} />

            <About/>

            <Features 
                featureTitle={<>Demand straightforward<br/> & bold answers</>}
                featureDescription='Ask a subjective question about your company history and see who’s done their research.'
                featureBG={FeatureBG}
                featureImg={FeatureOne} />

            <Features 
                featureTitle='Check who can create the best responsive email'
                featureDescription='HTML is complicated for some, especially non technical team members. Now you can assess what your ideal talent can create.'
                featureBG={FeatureBGTwo}
                featureImg={FeatureTwo} 
                positionBG='leftPosition'
                reversed/>

            <Features 
                featureTitle='See who is more analytical'
                featureDescription='Upload a sample dataset, and ask your talents to datamine your CRM, purchase transactions, NPS survey and more.'
                featureBG={FeatureBGThree}
                featureImg={FeatureThree} />

            <Features 
                featureTitle='Compare who writes the best content'
                featureDescription='Let’s say you need an excellent content writer to create a whitepaper, or a blog article. Evaluate their rigor in research, grammar and more.'
                featureBG={FeatureBGFour}
                featureImg={FeatureFour} 
                positionBG='leftPosition'
                reversed/>

            <HowItWorks/>

            <CTABlock/>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.auth.isLoading
    }
}

export default connect(mapStateToProps, { userAuth })(HomePage)