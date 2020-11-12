import styled, { css } from 'styled-components'
import theme from '../../theme'

export const FeaturesContainer = styled.section`
    margin-top: 120px;

    @media screen and (max-width: ${theme.breakpoints.md}){
        margin-top: 60px;
    }
`

export const Feature = styled.div`
    background-image: url(${props => props.bgImg});
    background-repeat: no-repeat;
    background-position: ${props => props.leftPosition ? 'top left' : 'top right'};
    background-size: 52.1vw 100%;
    height: 40vw;
    display: flex;
    align-items: center;
    margin-bottom: 120px;

    @media screen and (max-width: ${theme.breakpoints.md}){
        margin-bottom: 60px;
        background-image: none;
        height: auto;
    }
`

export const FeatureContent = styled.div`
    display: flex;
    align-items: center;
    padding-left: 8.75vw;
    padding-right: 7.125vw;
    flex-direction: ${props => props.reversed ? 'row-reverse' : null};

    @media screen and (max-width: ${theme.breakpoints.md}){
        display: block;
        background: #E7F0FD;
        width: 80vw;
        padding: 20px 40px;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;

        ${({reversed}) => reversed ? reversedStyle : null}
    }

    @media screen and (max-width: 450px){
        width: 75vw;
    }
`

export const FeatureImageBlock = styled.div`
    max-width: 60%;
    margin-right: 50px;

    & img {
        width: 100%;
        height: 100%;
    }

    @media screen and (max-width: ${theme.breakpoints.md}){
        margin-left: -20px;
        max-width: 100%;
        width: 100%;
    }
`

export const FeatureTextBlock = styled.div`
    position: relative;
`

export const FeatureHeading = styled.h1`
    font-size: 26px;
    font-weight: 500;

    @media screen and (max-width: 450px){
        font-size: 24px;
    }
`

export const FeatureSubtext = styled.p`
    font-size: 18px;
    width: 80%;
    line-height: 1.4;
    font-weight: 300;

    @media screen and (max-width: 450px){
        width: 90%;
        font-size: 16px;
        line-height: 1.3;
    }
`

const reversedStyle = css`
    margin-left: auto;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
`