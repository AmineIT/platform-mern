import React from 'react'
import { Link } from 'react-router-dom'

import { FooterWrapper, FooterElements, FooterLinks } from './style'
import Logo from '../../images/selfstarter-logo/selfstarter-logo-grey.svg'
 
const DashboardFooter = () => {
    return (
        <FooterWrapper>
            <FooterElements>
                <Link to='/'>
                    <img src={Logo} alt='Selfstarter Logo' />
                </Link>

                <FooterLinks>
                <Link to='/privacy'>Privacy</Link>
                    <div>
                        <Link to='/terms-and-conditions'>Terms & Conditions</Link>
                    </div>
                </FooterLinks>
            </FooterElements>
        </FooterWrapper>
    )
}

export default DashboardFooter