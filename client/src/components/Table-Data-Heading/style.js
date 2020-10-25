import styled from 'styled-components'
import theme from '../../theme'

export const DataHeading = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 10px;
    margin-bottom: ${theme.spacing.sixTeen};

    & .span-col-2 {
        grid-column: span 4 / auto;
    }

    & > div {
        color: ${theme.colors.black};
        font-family: ${theme.font.basisProMedium};
        display: flex;
        align-items: center;
    }

    & .expires, .updated {
        padding-left: ${theme.spacing.thirtyTwo};
    }

    & .actions {
        justify-content: center;
    }
`