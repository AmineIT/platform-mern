import styled from 'styled-components'
import theme from '../../theme'

export const CardWrapper = styled.div`
    ${theme.card};
    border-style: solid;
    border-width: 0 0 0 4px;
    border-color: ${({ status }) => status === 'published' ? theme.colors.green : (status === 'draft' ? theme.colors.primaryColor : theme.colors.primaryGrey)};;
    margin-bottom: ${theme.spacing.eight};

    & .tag {
        text-transform: capitalize;
    }

    & .tag:not(body).is-light {
        background-color: ${theme.colors.primaryGrey};
        color: #ffffff;
    }
`

export const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 10px;
    border-bottom: 1px solid ${theme.colors.lightGrey};

    & .span-col-2 {
        grid-column: span 4 / auto;
    }

    & > div {
        padding-left: ${theme.spacing.thirtyTwo};
        padding-top: ${theme.spacing.sixTeen};
    }
`

export const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${theme.spacing.eight};
`

export const Title = styled.h1`
    ${theme.body.regular};
    font-family: ${theme.font.basisProLight};
    display: inline-block;
    margin-right: ${theme.spacing.sixTeen};
`

export const Info = styled.p`
    ${theme.body.regular};
    font-family: ${theme.font.basisProRegular};
    color: ${theme.colors.primaryGrey};
    margin-bottom: ${theme.spacing.eight};
`

export const Details = styled.p`
    ${theme.body.regular};
    font-family: ${theme.font.basisProMedium};
    color: ${theme.colors.primaryGrey};
`

export const Actions = styled.div`
    border-left: 1px solid ${theme.colors.lightGrey};
    padding-left: 0 !important;
    padding-top: 0 !important;
    display: flex;
    align-items: center;
    justify-content: center;

    & .dropdown-item {
        font-size: 0.95rem;
    }
`