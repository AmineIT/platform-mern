import React from 'react'

import PrimaryButton from '../Primary-Button'
import { CtaSection, CtaHeading, CtaSubtext } from './style'

const CTABlock = () => {
    return (
        <CtaSection>
            <div>
                <CtaHeading>Interview Best Skilled Talents Today!</CtaHeading>
                <CtaSubtext>An assessment builder to help streamline a result-oriented hiring process.</CtaSubtext>
                <PrimaryButton text='Get Selfstarted' href='/' size='large'/>
            </div>
        </CtaSection>
    )
}

export default CTABlock