import styled, { createGlobalStyle } from 'styled-components'
import theme from '../../theme'

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: #FAFBFD;
        min-height: 100vh;
    }
`

export const Container = styled.div`
    width: 90vw;
    margin: auto;
    padding-top: ${theme.spacing.twentyFour};
    padding-bottom: ${theme.spacing.twentyFour};
    position: relative;

    & .content {
        font-family: ${theme.font.basisProRegular};
        color: ${theme.colors.primaryGrey};

        & p {
            margin-bottom: 0;
        }

        & .jobrole {
            margin-bottom: 5px;
        }
    }
`

export const Box = styled.div`
    margin-bottom: 0;
    padding: 8px 16px;
    box-shadow: none;
    border-radius: 4px;
    border-style: solid;
    border-width: 0 0 0 4px;
    border-color: ${({ score }) => score === 90 ? theme.colors.green : theme.colors.navyBlue};
    background: white;
`

export const Score = styled.span`
    color: ${({ score }) => score === 90 ? theme.colors.green : theme.colors.navyBlue};
`

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    & div {
        display: flex;
        align-items: center;
        position: absolute;
        left: 0;
        color: ${theme.colors.primaryGrey};
    }

    & img {
        width: 160px;
    }
`

export const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${theme.spacing.eight};
`

export const JobDetails = styled.div`
    position: relative;
    margin-top: ${theme.spacing.thirtyTwo};

    & p {
        color: ${theme.colors.primaryGrey};
        ${theme.body.small};
    }

    & .dot {
        position: relative;

        &::after {
            content: '';
            position: absolute;
            top: 8px;
            left: -10px;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background-color: ${theme.colors.primaryGrey};
        }
    }

    /* & .notification.is-link {
        background-color: ${theme.colors.lightBlue};
        color: ${theme.colors.primaryColor};
        width: 70%;
        margin: ${theme.spacing.sixTeen} auto;
        display: flex;
        align-items: center;
        font-family: ${theme.font.basisProMedium};
        justify-content: space-around;
    } */
`

export const HeadingContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: ${theme.colors.lightGrey};
    min-height: 60px;
    border-radius: 4px;
    padding-left: ${theme.spacing.sixTeen};
    margin-bottom: ${theme.spacing.sixTeen};

    & h1 {
        margin-left: .5em
    }
`

export const ColoredSpan = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background: ${({ title }) => title === 'Applied' ? theme.colors.orange : title === 'Screening' ? theme.colors.red : title === 'Shortlisted' ? theme.colors.purple : theme.colors.green};
`

export const JobTitle = styled.h1`
    ${theme.h5};
    margin-top: ${theme.spacing.sixTeen};
    margin-bottom: ${theme.spacing.eight};
`

export const ImagePlaceholder = styled.div`
    background-color: ${theme.colors.lightBlue};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 48px;
    height: 48px;

    & p {
        font-weight: 700;
        color: ${theme.colors.primaryColor}
    }
`

export const CTAWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: ${theme.spacing.eight} 0 0;

    & .result-cta {
        color: ${theme.colors.primaryColor};
        font-family: ${theme.font.basisProMedium};
        cursor: pointer;
        width: fit-content;
    }

    & p {
        color: ${theme.colors.primaryGrey};
        font-size: 14px;
    }
`