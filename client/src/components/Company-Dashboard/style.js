import styled from 'styled-components'
import theme from '../../theme'
import bg from '../../images/company-dashboard/feedback-bg.png'

export const Heading = styled.h1`
    ${theme.h4};
    padding-top: 40px;
`

export const Card = styled.div`
    ${theme.card};
    padding: 32px 24px;
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & h5 {
        ${theme.h6};
        font-family: ${theme.font.basisProLight};
        margin-bottom: ${theme.spacing.sixTeen};
    }

    & p {
        ${theme.body.regular};
        color: ${theme.colors.primaryGrey};
        margin-bottom: ${theme.spacing.twentyFour};
    }

    & .chart {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;

        & span {
            color: ${theme.colors.primaryGrey};
        }

        & p {
            font-family: ${theme.font.basisProBold};
            color: ${theme.colors.black}
        }

        & .status {
            position: absolute;
            right: 175px;
            top: 95px;
            color: rgb(254, 126, 33, 100%);
            font-family: ${theme.font.basisProBold};
            font-size: 20px;
        }
    }

    & canvas {
        height: 200px !important;
        width: 400px !important;
        position: relative;
    }
`

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;

    & > div {
        ${theme.card};
        margin-top: ${theme.spacing.twentyFour};
        padding: 32px 24px;
    }

    & .span-col-2 {
        grid-column: span 2 / auto;

        & p {
            color: ${theme.colors.primaryGrey};
            margin-bottom: ${theme.spacing.twentyFour};
        }

        & .link {
            color: ${theme.colors.primaryColor};
        }
    }

    & .span-row-2 {
        grid-row: span 2 / auto;
    }

    & h5 {
        ${theme.h6};
        font-family: ${theme.font.basisProLight};
        margin-bottom: ${theme.spacing.sixTeen};
    }

    & .feedback {
        text-align: center;
        background-image: url(${bg});
        background-size: cover;
        margin-top: 0;

        & h5, & p {
            margin-bottom: ${theme.spacing.eight};
        }

        & a {
            color: ${theme.colors.primaryColor};
            font-family: ${theme.font.basisProBold};
            text-decoration: underline;
        }
    }
`

export const JobList = styled.div`
    ${theme.body.regular};
    font-family: ${theme.font.basisProRegular};

    & span, & p {
        color: ${theme.colors.primaryGrey}
    }
`

export const Divider = styled.span`
    width: 100%;
    height: 1px;
    background-color: ${theme.colors.lightGrey};
    margin: ${theme.spacing.sixTeen} 0px;
    display: block;
`