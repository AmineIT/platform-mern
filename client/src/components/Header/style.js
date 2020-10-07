import styled from 'styled-components'
import theme from '../../theme'

export const NavbarContainer = styled.div`
    width: 100vw;
    height: auto;
    position: relative;
    z-index: 9999;
`

export const Navbar = styled.div`
    background-color: ${theme.colors.lightBlue};
    width: 68.6875vw;
    height: 100px;

    @media screen and (max-width: 1540px){
        width: 65vw;
    }

    @media screen and (max-width: 1280px){
        width: 60vw;
    }

    @media screen and (max-width: ${theme.breakpoints.md}){
        width: 88%;
    }
`