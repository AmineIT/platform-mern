import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Logout, fetchNotification, clearNotifications } from '../../actions/authActions'
import moment from 'moment'

import Logo from '../../images/selfstarter-logo/selfstarter-logo.svg'
import { BiUserCircle } from 'react-icons/bi'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { Navbar, NavbarDivider, Notifications } from './style'

const DashboardNavbar = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const [isNotificationActive, setIsNotificationActive] = useState(false)
    const [isDropDownActive, setIsDropDownActive] = useState(false)

    const logOut = () => {
        dispatch(Logout())
    }

    const handleNotification = () => {
        dispatch(clearNotifications())
    }

    useEffect(() => {
        dispatch(fetchNotification())
    }, [dispatch])

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

                        <div onClick={() => setIsNotificationActive(!isNotificationActive)} className={`navbar-item has-dropdown ${isNotificationActive ? 'is-active' : ''}`}>
                            <span className="navbar-link">
                                <div className={`question ${user.notifications.length > 0 ? 'notifications' : ''}`}>
                                    <IoMdNotificationsOutline size='26' color='#7E8BA2' />
                                </div>
                            </span>
                            <div className="navbar-dropdown is-right" style={{ paddingTop: 0, paddingBottom: 0, minWidth: '350px' }}>
                                <Notifications>
                                    <div className='flex'>
                                        <h1>Notifications</h1>
                                        {user.notifications.length > 0 ? <small onClick={handleNotification}>Mark all as read</small> : null}
                                    </div>
                                    <div className={user.notifications.length > 4 ? `notification-wrapper` : ''} style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                                        {
                                            user.notifications.length > 0 ?
                                                user.notifications.sort((a, b) => a._id - b._id).map((notification, index) => (
                                                    <div key={index}>
                                                        <div className="navbar-item" style={{ padding: '1rem 0rem' }}>
                                                            <div className='flex' style={{ marginBottom: '8px' }}>
                                                                <h4>{notification.messageType}</h4>
                                                                <small style={{ color: '#7E8BA2' }}>{moment(notification.addedAt).fromNow(true)}</small>
                                                            </div>
                                                            <span>{notification.message}</span>
                                                        </div>
                                                    </div>
                                                ))
                                                :
                                                (
                                                    <p>You don't have any notifications.</p>
                                                )
                                        }
                                    </div>
                                    <p className='manage'>Manage your notifications</p>
                                </Notifications>
                            </div>

                        </div>

                        <div onClick={() => setIsDropDownActive(!isDropDownActive)} className={`navbar-item has-dropdown ${isDropDownActive ? 'is-active' : ''}`}>
                            <span className="navbar-link">
                                {!user
                                    ?
                                    (<BiUserCircle size='26' stroke='1' />)
                                    :
                                    null
                                }
                                <span style={{ fontSize: '14px' }}>{user ? user.fullName : 'Username'}</span>
                            </span>

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

export default DashboardNavbar