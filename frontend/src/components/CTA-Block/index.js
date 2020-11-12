import React from 'react'

import Button from '../Button'
import { CtaSection, CtaHeading, CtaSubtext } from './style'

const CTABlock = () => {
    return (
        <CtaSection>
            <div>
                <CtaHeading>Interview Best Skilled Talents Today!</CtaHeading>
                <CtaSubtext>An assessment builder to help streamline a result-oriented hiring process.</CtaSubtext>
                <Button to='/register' size='large'>Get Selfstarter</Button>
            </div>
        </CtaSection>
    )
}

export default CTABlock