import styled from 'styled-components'
import theme from '../../theme'

export const CtaSection = styled.section`
    width: 60vw;
    height: 300px;
    margin: 0 auto 120px;
    background-color: ${theme.colors.darkBlue};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.lightBlue};

    @media screen and (max-width: ${theme.breakpoints.md}){
        width: 90vw;
    }

    & div {
        text-align: center;
    }
`

export const CtaHeading = styled.h1`
    font-size: 2.2vw;
    margin-bottom: 30px;
    margin-top: 0;
    padding: 0 30px;
    font-weight: 500;

    @media screen and (max-width: ${theme.breakpoints.md}){
        font-size: 28px;
    }
`

export const CtaSubtext = styled.p`
    font-size: 1.2vw;
    font-weight: 300;
    margin-bottom: 30px;
    padding: 0 30px;

    @media screen and (max-width: ${theme.breakpoints.md}){
        font-size: 18px;
    }
`