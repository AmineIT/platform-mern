import styled from 'styled-components'
import theme from '../../theme'

export const HowItWorksContainer = styled.section`
    position: relative;
`

export const Heading = styled.h1`
    font-size: 32px;
    margin-bottom: 10px;
    text-align: center;
    font-weight: 500;

    @media screen and (max-width: 450px){
        font-size: 24px;
    }
`

export const Subtext = styled.p`
    font-size: 24px;
    font-weight: 300;
    text-align: center;

    @media screen and (max-width: ${theme.breakpoints.md}){
        font-size: 22px;
        margin-top: 5px;
    }

    @media screen and (max-width: 450px){
        font-size: 18px;
        padding: 0 40px;
    }
`

export const Steps = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding-left: 8.75vw;
    padding-right: 7.125vw;
    margin-top: 60px;
    margin-bottom: 60px;

    @media screen and (max-width: ${theme.breakpoints.md}){
        display: block;
        margin-top: 30px;
    }
`

export const Step = styled.div`
    text-align: center;

    @media screen and (max-width: ${theme.breakpoints.md}){
        margin-bottom: 25px;
    }

    & p {
        line-height: 1.4;
        font-weight: 400;

        @media screen and (max-width: ${theme.breakpoints.md}){
            margin-top: 10px;
        }
    }
`

export const Icon = styled.div`
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: ${theme.colors.lightBlue};
    border-radius: 10px;
    margin: 0 auto 30px;

    @media screen and (max-width: ${theme.breakpoints.md}){
        margin: 0 auto 15px;
    }
`

export const StepHeading = styled.h2`
    font-size: 22px;
    font-weight: 500;

    @media screen and (max-width: ${theme.breakpoints.md}){
        margin-bottom: 0px;
    }
`