import React from 'react'
import { Link } from 'react-router-dom'

import PrimaryButton from '../Primary-Button'
import Logo from '../../images/selfstarter-logo/selfstarter-logo.svg'
import { 
    MenuContainer,
    NavbarList,
    NavbarLogo,
    NavbarItem,
    LeftMenu,
    NavLink,
    RightMenu,
    NavbarContainer } from './style'

const NavbarLinks = () => {
    return (
        <MenuContainer>
            <NavbarContainer>
                <LeftMenu>
                    <NavbarList>
                        <NavLink href="/">
                            <NavbarLogo src={Logo} alt="Selfstarter-Logo" />
                        </NavLink>

                        <NavbarItem>
                            <NavLink href="/">Product</NavLink>
                        </NavbarItem>

                        <NavbarItem>
                            <NavLink href="https://medium.com/selfstarter" target="blank">Recources</NavLink>
                        </NavbarItem>
                    </NavbarList>
                </LeftMenu>

                <RightMenu>
                    <NavbarList>
                        <NavbarItem>
                            <Link className="links" to="/registre">Sign up</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <PrimaryButton href="/" size='small' text='login'></PrimaryButton>
                        </NavbarItem>
                    </NavbarList>
                </RightMenu>
            </NavbarContainer>
        </MenuContainer>
    )
}

export default NavbarLinks