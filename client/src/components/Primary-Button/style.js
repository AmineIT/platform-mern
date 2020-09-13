import styled, { css } from 'styled-components'
import theme from '../../theme'

export const Button = styled.a`
    ${theme.a};
    background-color: ${({transparent}) => transparent ? (theme.colors.white) : (theme.colors.primaryColor)};
    color: ${({transparent}) => transparent ? (theme.colors.primaryColor) : (theme.colors.white)};
    border: 1px solid ${({transparent}) => transparent ? (theme.colors.primaryColor) : ''};
    ${({ size }) => (size === 'large' ? LargeBtn : (size === 'medium' ? MediumBtn : (size === 'small' ? SmallBtn : BlockBtn)))};
    border-radius: 9px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-right: 10px;

    &:hover {
        color: ${theme.colors.white};
        color: ${({transparent}) => transparent ? (theme.colors.primaryColor) : (theme.colors.white)};
    }

    @media screen and (max-width: ${theme.breakpoints.xs}){
        width: 100%;
        margin-bottom: 10px;
    }
`

const BlockBtn = css`
    width: 100%;
    height: 60px;
    font-size: 20px;
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