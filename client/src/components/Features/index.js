import React from 'react'
import { 
    FeaturesContainer, 
    Feature,
    FeatureContent,
    FeatureImageBlock,
    FeatureTextBlock,
    FeatureHeading,
    FeatureSubtext } from './style'

const Features = ({featureTitle, featureDescription, featureImg, featureBG, positionBG, reversed}) => {
    return (
        <FeaturesContainer>
            <Feature bgImg={featureBG} leftPosition={positionBG}>
                <FeatureContent reversed={reversed}>
                    <FeatureImageBlock>
                        <img src={featureImg} alt='Selfstarter Feature' />
                    </FeatureImageBlock>
                    <FeatureTextBlock>
                        <FeatureHeading>{featureTitle}</FeatureHeading>
                        <FeatureSubtext>{featureDescription}</FeatureSubtext>
                    </FeatureTextBlock>
                </FeatureContent>
            </Feature>
        </FeaturesContainer>
    )
}

export default Features