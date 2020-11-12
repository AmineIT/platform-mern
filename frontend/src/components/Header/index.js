import React from 'react'

import { NavbarContainer, Navbar } from './style'
import NavbarLinks from '../Navbar-Links'

const Header = () => {
    return (
        <NavbarContainer>
            <Navbar>
                <NavbarLinks />
            </Navbar>
        </NavbarContainer>
    )
}

export default Header