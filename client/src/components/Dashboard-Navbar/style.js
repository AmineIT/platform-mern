import styled from 'styled-components'
import theme from '../../theme'

export const Navbar = styled.div`
    & .navbar {
        padding-left: 14px;
        padding-right: 24px;
        height: 80px;
    }

    & .has-dropdown .navbar-link:not(.is-arrowless) {
        color: ${theme.colors.primaryGrey};
        font-weight: 500
    }

    & .navbar-link:not(.is-arrowless)::after {
        border-color: ${theme.colors.primaryGrey}
    }

    & .profile-image {
        width: 40px;
        height: 40px;
    }

    & .image img.is-rounded {
        border-radius: 50%;
    }

    & .navbar-item img {
        max-height: max-content;
    }

    & a.navbar-item:focus, 
    a.navbar-item:focus-within, 
    a.navbar-item:hover, 
    a.navbar-item.is-active, 
    .navbar-link:focus, 
    .navbar-link:focus-within, 
    .navbar-link:hover, 
    .navbar-link.is-active {
        background-color: #f9f9f9;
    }

    & 
    .navbar-brand .navbar-item:focus, 
    .navbar-brand .navbar-item:focus-within, 
    .navbar-brand .navbar-item:hover, 
    .navbar-brand .navbar-item.is-active {
        background-color: ${theme.colors.white};
    }

    & .navbar-brand, .navbar-tabs {
        padding-right: 32px;
        box-shadow: rgb(228, 231, 235) 1px 0px 0px 0px;
    }

    & .navbar-item-helper {
        color: ${theme.colors.primaryGrey};
        display: block;
        font-size: 12px;
        text-transform: uppercase;
    }

    & .navbar-dropdown .navbar-item {
        display: block;
    }

    & .logout, .question {
        cursor: pointer;
    }

    & .question {
        display: flex;
    }
`

export const NavbarDivider = styled.div`
    margin-top: -1px;
    width: 100%;
    height: 1px;
    position: fixed;
    z-index: 6;
    box-shadow: rgb(228, 231, 235) 0px 1.2px 0px;
    top: 80px;
`