import styled from 'styled-components'

import AboutBG from '../../images/home-page/about-bg.svg'
import theme from '../../theme';

export const AboutSection = styled.section`
    position: relative;

    &::after {
        content: '';
        background-image: url(${AboutBG});
        background-repeat: no-repeat;
        background-position: top right;
        height: 40.125vw;
        background-size: 80vw 100%;
        padding-left: 8.75vw;
        padding-right: 7.125vw;
        margin-top: 4.1875vw;
        position: absolute;
        width: 70vw;
        top: 300px;
        right: 0;
        z-index: -99;

        @media screen and (max-width: ${theme.breakpoints.md}){
            display: none
        }
    }
`

export const AboutHeading = styled.h1`
    margin: 120px 0 20px;
    font-size: 3.125vw;
    font-weight: 500;
    text-align: center;
    
    @media screen and (max-width: ${theme.breakpoints.md}){
        font-size: 32px;
        margin: 60px 0 20px;
    }

    @media screen and (max-width: 450px){
        font-size: 28px;
        padding: 0 20px;
    }
`

export const AboutSubtext = styled.p`
    font-size: 1.2vw;
    width: 50vw;
    margin: auto;
    font-weight: 300;
    line-height: 1.3;
    text-align: center;

    @media screen and (max-width: ${theme.breakpoints.md}){
        font-size: 16px;
        width: 80vw;
    }
`

export const PlatformOverview = styled.div`
    width: 90vw;
    position: relative;
    margin: 0 auto 200px;
    display: flex;

    @media screen and (max-width: ${theme.breakpoints.md}){
        margin: 0 auto 20px;
    }
`

export const AboutAsset = styled.div`
    width: 15vw;
    padding-top: ${props => props.secondAsset ? '350px' : '120px'};

    & img {
        width: 100%
    }

    @media screen and (max-width: ${theme.breakpoints.md}){
        display: none;
    }
`

export const MainAsset = styled.div`
    width: 70%;
    position: relative;

    & img {
        width: 100%;
        height: 100%;
    }

    @media screen and (max-width: ${theme.breakpoints.md}){
        width: 90vw;
        margin: auto;
    }
`