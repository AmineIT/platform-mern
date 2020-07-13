import React from 'react'

import { 
    FooterContainer,
    FooterRow,
    FooterColOne,
    FooterContent,
    FooterColTwo,
    FooterLinks,
    FooterSubscription,
    SocialMediaFooter,
    FooterSubtext } from './style'

import Logo from '../../images/selfstarter-logo/selfstarter-logo.svg'
import LinkdeinIcon from '../../images/footer/linkedin-icon.svg'
import FacebookIcon from '../../images/footer/facebook-icon.svg'
import InstagramIcon from '../../images/footer/instagram-icon.svg'
import TwitterIcon from '../../images/footer/twitter-icon.svg'

const Footer = () => {
    return (
        <FooterContainer>
            <FooterRow>
                <FooterColOne>
                    <FooterContent>
                        <img src={Logo} alt='Selfstarter Logo' />
                        <p>Selfstarter is an assessment builder specifically for department heads to make hiring process seamless, or less biased with no involvement of a resume.</p>
                    </FooterContent>
                </FooterColOne>

                <FooterColTwo>
                    <FooterLinks>
                        <a href='/'>Product</a>
                        <a href='https://medium.com/selfstarter'>Resources</a>
                        <a href='/'>Contact</a>
                        <a href='/'>Privacy Policy</a>
                    </FooterLinks>
                    <FooterSubscription>
                        <span>Subscribe to our newsletter</span>
                        <br/>
                        <div>
                            <input type='email' placeholder='Your Email' required />
                            <button>Subscribe</button>
                        </div>
                    </FooterSubscription>
                    <SocialMediaFooter>
                        <a href='/'>
                            <img src={LinkdeinIcon} alt='Selfstarer Linkdein'/>
                        </a>
                        <a href='/'>
                            <img src={FacebookIcon} alt='Selfstarer Facebook'/>
                        </a>
                        <a href='/'>
                            <img src={InstagramIcon} alt='Selfstarer Instagrame'/>
                        </a>
                        <a href='/'>
                            <img src={TwitterIcon} alt='Selfstarer Twitter'/>
                        </a>
                    </SocialMediaFooter>
                </FooterColTwo>
            </FooterRow>
            <FooterSubtext>
                All Rights Reserved | Selfstarter
            </FooterSubtext>
        </FooterContainer>
    )
}

export default Footer