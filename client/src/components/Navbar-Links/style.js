import styled from 'styled-components'
import theme from '../../theme/index'

export const MenuContainer = styled.div`
    padding-top: 2vw;
`

export const NavbarContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
`

export const LeftMenu = styled.div`
    padding-left: 8.75vw;

    @media screen and (max-width: ${theme.breakpoints.md}){
        padding-left: 20px;
    }
`

export const NavbarList = styled.ul`
    ${theme.ul};
    display: flex;
    align-items: center;
`

export const NavbarLogo = styled.img`
    width: 12vw;
    height: auto;
    margin-right: 60px;

    @media screen and (max-width: ${theme.breakpoints.md}){
        width: 200px;
    }
`

export const NavLink = styled.a`
    ${theme.a}
`

export const NavbarItem = styled.li`
    font-size: 18px;
    color: ${theme.colors.black};
    margin-right: 60px;
    margin-top: 5px;

    & a.links {
        ${theme.a}
    }

    @media screen and (max-width: ${theme.breakpoints.md}){
        display: none;
    }
`

export const RightMenu = styled.div`
    margin-left: auto;
    padding-right: 7.125vw;

    @media screen and (max-width: 1120px){
        padding-right: 0;
    }
`