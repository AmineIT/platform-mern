import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Button from '../Button'
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

const NavbarLinks = ({user, isAuthenticated}) => {
    
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
                            {!isAuthenticated ? (<Link className="links" to="/register">Sign up</Link>) : null}
                        </NavbarItem>
                        <NavbarItem>
                            {isAuthenticated 
                                ? 
                                (<Button to={user.role === 'employer' ? '/company-dashboard' : '/employee-dashboard'} size='medium'>Go to dashboard</Button>)
                                : 
                                (<Button to="/login" size='small'>
                                    <span>Login</span>
                                </Button>)
                            }
                        </NavbarItem>
                    </NavbarList>
                </RightMenu>
            </NavbarContainer>
        </MenuContainer>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(NavbarLinks)