import styled from 'styled-components'
import theme from '../../theme'

export const BannerContainer = styled.div`
    background-color: ${theme.colors.lightBlue};
    border-radius: 0px 0px 50px 0px;
    background-repeat: no-repeat;
    width: 68.6875vw;
    height: 50vw;

    @media screen and (max-width: 1540px){
        width: 65vw;
    }

    @media screen and (max-width: 1280px){
        width: 60vw;
    }

    @media screen and (max-width: ${theme.breakpoints.md}){
        width: 88%;
        height: 430px;
    }
`

export const BannerContent = styled.div`
    padding-left: 8.75vw;
    padding-top: 7.875vw;

    @media screen and (max-width: ${theme.breakpoints.md}){
        padding-left: 20px;
        padding-top: 7.875vw;
    }
`

export const BannerHeading = styled.h1`
    font-style: normal;
    font-weight: bold;
    font-size: 3.125vw;
    line-height: 3.9375vw;
    color: ${theme.colors.black};
    margin: 0 0 40px;

    @media screen and (max-width: ${theme.breakpoints.md}){
        width: 90%;
        font-size: 38px;
        line-height: 1.2;
        margin: 0 0 20px
    }
`

export const BannerSubtext = styled.p`
    font-style: normal;
    font-size: 20px;
    color: ${theme.colors.black};
    width: 60%;
    margin: 40px 0;
    line-height: 1.4;

    @media screen and (max-width: ${theme.breakpoints.md}){
        width: 90%;
        font-size: 18px;
        margin: 0 0 20px
    }
`

export const CtaBlock = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 450px){
        & a:last-child {
            display: none
        }
    }
`

export const BannerImageContainer = styled.div`
    width: 50vw;
    height: auto;
    position: absolute;
    right: 0vw;
    top: 4.5vw;

    @media screen and (max-width: ${theme.breakpoints.md}){
        display: none
    }
`

export const BannerImage = styled.img`
    width: 100%;
    height: 100%;
`