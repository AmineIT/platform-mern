import styled from 'styled-components'
import theme from '../../theme'

export const Sidebar = styled.div`
    width: 200px;
    height: 100%;
    background-color: ${theme.colors.white};
    box-shadow: rgb(228, 231, 235) 1px 0px 0px 0px;
    position: fixed;
    top: 0px;
    padding-top: 80px;
`

export const Menu = styled.div`
    position: absolute;
    left: 0;
    top: 80px;
    width: 200px;
`

export const MenuWrapper = styled.ul`
    height: 100%;
    overflow: hidden auto;
    position: relative;
`

export const MenuItem = styled.li`
    display: block;
    width: 100%;
    background-color: ${({active}) => active ? theme.colors.lightBlue : theme.colors.white};

    & .menu-link {
        cursor: pointer;
        text-decoration: none;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        color: ${({active}) => active ? theme.colors.primaryColor : theme.colors.primaryGrey};
        background: transparent;
        padding: 16px 24px;
        position: relative;
        transition: color 0.1s ease 0s;
    }

    & span {
        font-size: 16px;
        margin-top: 4px;
        margin-left: 16px;
    }
`