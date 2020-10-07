import styled from 'styled-components'
import theme from '../../theme'

export const FooterWrapper = styled.div`
    border-top: 2px solid rgba(199, 205, 216, 0.2);
    padding-top: ${theme.spacing.sixTeen};
    padding-bottom: ${theme.spacing.twentyFour};
    width: 100%;
    margin-top: ${theme.spacing.thirtyTwo};
    position: absolute;
    bottom: 0;
`

export const FooterElements = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

export const FooterLinks = styled.div`
    display: flex;
    justify-content: flex-end;

    & a {
        color: ${theme.colors.primaryGrey};
    }

    & div {
        margin-left: ${theme.spacing.thirtyTwo}
    }
`