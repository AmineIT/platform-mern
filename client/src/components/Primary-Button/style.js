import styled, { css } from 'styled-components'
import theme from '../../theme'

export const Button = styled.a`
    ${theme.a};
    background-color: ${({transparent}) => transparent ? (theme.colors.white) : (theme.colors.primaryColor)};
    color: ${({transparent}) => transparent ? (theme.colors.primaryColor) : (theme.colors.white)};
    border: 1px solid ${({transparent}) => transparent ? (theme.colors.primaryColor) : ''};
    ${({ size }) => (size === 'large' ? LargeBtn : (size === 'medium' ? MediumBtn : SmallBtn))};
    border-radius: 9px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;

    &:hover {
        color: ${theme.colors.white};
        color: ${({transparent}) => transparent ? (theme.colors.primaryColor) : (theme.colors.white)};
    }
`

const LargeBtn = css`
    width: 250px;
    height: 70px;
    font-size: 22px;
`

const MediumBtn = css`
    width: 190px;
    height: 60px;
    font-size: 18px;
`

const SmallBtn = css`
    width: 170px;
    height: 45px;
    font-size: 18px;
`