import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Logout } from '../../actions/authActions'

import Logo from '../../images/selfstarter-logo/selfstarter-logo.svg'
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { Navbar, NavbarDivider } from './style'

const DashboardNavbar = ({user, Logout}) => {
    
    const logOut = () => {
        Logout();
    }

    return (
        <Navbar>
            <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/" >
                        <img src={Logo} width="130" alt='Selfstarter Logo' />
                    </Link>

                    <button className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </button>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-end">
                        <div className='navbar-item'>
                            <div className='question'>
                                <AiOutlineQuestionCircle size='26' color='#7E8BA2' />
                            </div>
                        </div>
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                {!user 
                                    ?
                                    (<BiUserCircle size='26' stroke='1' />)
                                    : 
                                    null
                                }
                                <span style={{fontSize: '14px'}}>{user ? user.fullName : 'Username'}</span>
                            </a>

                            {
                                user 
                                ? 
                                    (<div className="navbar-dropdown is-right">
                                        <div className="navbar-item">
                                            <span className='navbar-item-helper'>Your email</span>
                                            <span>{user.email}</span>
                                        </div>
                                        <hr className="navbar-divider" />
                                        <div className="navbar-item">
                                            <span className='navbar-item-helper'>Your phone number</span>
                                            <span>{user.phoneNumber}</span>
                                        </div>
                                        <hr className="navbar-divider" />
                                        <div className="navbar-item">
                                            <span className='navbar-item-helper'>Company name</span>
                                            <span>{user.companyName}</span>
                                        </div>
                                        <hr className="navbar-divider" />
                                        <div onClick={logOut} className="navbar-item logout">Logout</div>
                                    </div>) 
                                : 
                                null
                            }
                            
                        </div>
                    </div>
                </div>
            </nav>
            <NavbarDivider />
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated,
        userLoaded: state.auth.userLoaded
    }
}

export default connect(mapStateToProps, { Logout })(DashboardNavbar)