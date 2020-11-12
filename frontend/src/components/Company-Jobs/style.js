import styled from 'styled-components'
import theme from '../../theme'

export const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
`

export const EmptyState = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 480px;

    & > div {
        text-align: center;
        color: ${theme.colors.primaryColor};

        & > p {
            color: ${theme.colors.primaryGrey};
        }

        & > a {
            font-weight: 600;
            text-decoration: underline;
            color: ${theme.colors.primaryColor};

            &:hover {
                color: ${theme.colors.primaryColor};
            }
        }
    }
`