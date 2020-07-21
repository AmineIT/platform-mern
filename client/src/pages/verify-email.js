import React from 'react'

import { 
    RegisterContainer, 
    RegisterColOne, 
    LogoContainer, 
    RegisterAssetSection, 
    RegisterColTwo, 
    RegisterContent, 
    RegisterHeading,
    RegisterSubtext } from '../components/Register-Section/style'

import Logo from '../images/selfstarter-logo/selfstarter-logo.svg'
import RegisterAsset from '../images/register-page/register-asset.svg'

const VerifyEmailPage = ({location, history}) => {

    const token = location.search.split('=')[1]

    if (token === '' || !token) {
        history.push('/register')
        return false
    }

    return (
        <RegisterContainer>
            <RegisterColOne>
                <LogoContainer>
                    <img src={Logo} alt="Selfstarter Logo" />
                </LogoContainer>
                <RegisterAssetSection>
                    <img src={RegisterAsset} alt="Selfstarter Register Asset" />
                </RegisterAssetSection>
            </RegisterColOne>
        
            <RegisterColTwo>
                    <RegisterContent style={{display: 'flex', alignItems: 'center', height: '90vh'}}>
                        {token === '' ? (
                            <div>
                                <RegisterHeading>Something went wrong. Please contact us for assistance on <a className="text-has-link" href="mailto:support@selfstarter.app">support@selfstarter.app</a></RegisterHeading>
                            </div>
                        ) : (
                            <div>
                                <RegisterHeading>Thanks for verifying your account <span role="img" aria-label="emoji">🎉</span></RegisterHeading>
                                <RegisterSubtext>You'll be redirected to your account after 5 seconds.</RegisterSubtext>
                            </div>
                        )}
                    </RegisterContent>
            </RegisterColTwo>
        </RegisterContainer>
    )
}

export default VerifyEmailPage