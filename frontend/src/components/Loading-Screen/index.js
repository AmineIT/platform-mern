import React from 'react'

import { LoadingContainer, ContentContainer } from './style'
import Logo from '../../images/selfstarter-logo/selfstarter-logo.svg'
import ScaleLoader from 'react-spinners/ScaleLoader'

const LoadingScreen = () => {

    return (
        <LoadingContainer>
            <ContentContainer>
                <img src={Logo} alt='Selfstarter Logo' />
                <ScaleLoader color='#1C65E3' />
            </ContentContainer>
        </LoadingContainer>
    )
}

export default LoadingScreen