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

    & .e-card {
        border-radius: 8px;
    }

    & .box {
        margin-bottom: 0;
        padding: 8px 16px;
    }

    & .content {
        font-family: ${theme.font.basisProRegular};
        color: ${theme.colors.primaryGrey};

        & .fullname {
            margin-bottom: -15px;
        }

        & p {
            margin-bottom: 0;
        }

        & .score span {
            color: ${theme.colors.navyBlue};
        }

        & .jobrole {
            margin-bottom: -10px;
        }

        & .result-cta {
            color: ${theme.colors.primaryColor};
            font-family: ${theme.font.basisProMedium};
            cursor: pointer;
            text-decoration: underline;
            width: fit-content;
        }
    }
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

    & > h1 {
        ${theme.h6};
        margin-top: ${theme.spacing.sixTeen};
        margin-bottom: ${theme.spacing.eight};
    }

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