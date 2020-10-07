import React from 'react'

import Button from '../Button'
import { OutlineButton } from '../Outline-Button'

import { 
    BannerContainer,
    BannerContent,
    BannerHeading,
    BannerSubtext,
    CtaBlock,
    BannerImageContainer,
    BannerImage } from './styles'

const HeroBanner = ({heading, subtext, heroImg}) => {
    return (
        <BannerContainer>
            <BannerContent>
                <BannerHeading>{heading}</BannerHeading>
                <BannerSubtext>{subtext}</BannerSubtext>
                <CtaBlock>
                    <Button to="/register" size='medium'>Get Selfstarter</Button>
                    <OutlineButton href="/" text="See how it works"/>
                </CtaBlock>
            </BannerContent>

            <BannerImageContainer>
                <BannerImage src={heroImg} />
            </BannerImageContainer>
        </BannerContainer>
    )
}

export default HeroBanner