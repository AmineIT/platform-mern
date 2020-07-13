import styled from 'styled-components'
import theme from '../../theme'

export const OutlineBtn = styled.a`
    ${theme.a};
    color: ${theme.colors.primaryColor};
    margin-left: 30px;
    font-weight: bold;
    font-size: 18px;
    position: relative;
    padding-bottom: 5px;

    &::after {
        content: '';
        position: absolute;
        bottom: 0px;
        left: 0;
        background-color: ${theme.colors.primaryColor};
        width: 100%;
        height: 2px;
    }
`