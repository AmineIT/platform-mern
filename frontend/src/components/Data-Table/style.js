import styled from 'styled-components'
import theme from '../../theme'

export const ImagePlaceholder = styled.div`
    background-color: ${theme.colors.lightBlue};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 38px;
    height: 38px;
`

export const ShortenName = styled.div`
    font-weight: 700;
    color: ${theme.colors.primaryColor};
    font-size: 12px;
`

export const Name = styled.div`
    font-family: ${theme.font.basisProBold};
    color: ${theme.colors.primaryColor};
`

export const FlexWrapper = styled.div`
    display: flex;
    align-items: center;

    & p {
        color: ${theme.colors.primaryGrey};
        font-size: 14px;
    }

    & .label {
        color: ${theme.colors.primaryGrey};
        font-weight: 200;
        font-size: 14px;
    }
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