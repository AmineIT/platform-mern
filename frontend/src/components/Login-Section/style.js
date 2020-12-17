import styled from 'styled-components'
import theme from '../../theme'

export const LoginContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;

    @media screen and (max-width: ${theme.breakpoints.lg}){
       display: block;
       height: auto;
    }

    .help {
        font-size: .85rem;
        margin-top: 0;
    }
`

export const LoginColOne = styled.div`
    width: 50vw;
    height: 100%;
    background-color: ${theme.colors.lightBlue};
    border-bottom-right-radius: 30px;

    @media screen and (max-width: ${theme.breakpoints.lg}){
        width: 70%;
    }
`

export const LogoContainer = styled.div`
    padding: 40px;
    width: fit-content;

    @media screen and (max-width: ${theme.breakpoints.lg}){
       padding-left: 60px;
    }

    @media screen and (max-width: ${theme.breakpoints.sm}){
        padding-left: 20px;
    }

    & img {
        width: 220px;
    }
`

export const LoginAssetSection = styled.div`
    width: fit-content;
    margin-left: 40px;

    & img {
        width: 75%;

        @media screen and (max-width: ${theme.breakpoints.lg}){
            display: none
        }
    }
`

export const LoginColTwo = styled.div`
    height: 100%;
    padding-left: 60px;
    width: 800px;

    @media screen and (max-width: ${theme.breakpoints.sm}){
        width: 100%;
        padding-right: 20px;
        padding-left: 20px;
    }
`

export const LoginContent = styled.div`
    margin-top: 80px;
`

export const LoginHeading = styled.h1`
    font-size: 34px;
    line-height: 40px;
    margin: 20px 0;
`

export const LoginSubtext = styled.p`
    font-size: 20px;
    color: #828282;

    & a {
        color: ${theme.colors.primaryColor};
        font-weight: 600;
        text-decoration: underline;
    }
`

export const LoginForm = styled.div`
    margin-top: 80px;
    width: 65%;

    @media screen and (max-width: ${theme.breakpoints.sm}){
        width: 100%;
    }
`

export const Label = styled.p`
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    position: relative;
    width: fit-content;
    color: ${theme.colors.primaryGrey};
`

export const ForgotPassword = styled.a`
    color: ${theme.colors.primaryColor};
    font-weight: 600;
    margin-top: 20px;
    display: inline-block;

    &:hover {
        color: ${theme.colors.primaryColor};
    }
`