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

export const AssessmentDetails = styled.div`
    position: relative;
    margin-top: ${theme.spacing.thirtyTwo};

    & p {
        color: ${theme.colors.primaryGrey};
        ${theme.body.small};
    }

    & .dot {
        position: relative;
        margin-right: 5px;

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

    & .info {
        color: ${theme.colors.primaryColor};
        display: flex;
        align-items: center;
    }
`

export const AssessmentTitle = styled.h1`
    ${theme.h5};
    margin-top: ${theme.spacing.sixTeen};
    margin-bottom: ${theme.spacing.eight};
`

export const QuestionWrapper = styled.div`
    padding-bottom: ${theme.spacing.sixTeen};
    margin-top: ${theme.spacing.sixTeen};
    border-bottom: 1px solid ${theme.colors.lightGrey};

    &:last-of-type {
        border-bottom: none;
    }

    & .ql-editor {
        min-height: 200px;
    }

    & .ql-snow {
        background-color: #ffffff
    }
`

export const QuestionText = styled.h1`
    font-size: 18px;
    color: ${theme.colors.black};
    font-weight: 100;
    margin-bottom: ${theme.spacing.sixTeen};
`

export const RadioWrapper = styled.div`
    margin-bottom: ${theme.spacing.sixTeen};
`

export const Label = styled.label`
    padding: 16px;
    background-color: ${theme.colors.navyBlue};
    max-width: 50%;
    border-radius: 4px;
    display: flex;
    align-items: center;
`