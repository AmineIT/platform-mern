import React from 'react'
import { Link } from 'react-router-dom'

import { Sidebar, Menu, MenuWrapper, MenuItem } from './style'
import { RiDashboardLine } from 'react-icons/ri'
import { BiBriefcaseAlt2, BiBarChartSquare } from 'react-icons/bi'
import { FiUsers, FiSettings } from 'react-icons/fi'
import { AiOutlineHome } from 'react-icons/ai'

const DashboardSidebar = () => {
    return (
        <Sidebar>
            <Menu>
                <MenuWrapper>
                    <MenuItem active>
                        <Link to='/company-dashboard' className='menu-link'>
                            <RiDashboardLine size='24' />
                            <span>Dashboard</span>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to='/jobs' className='menu-link'>
                            <BiBriefcaseAlt2 size='24' />
                            <span>Jobs</span>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to='/candidates' className='menu-link'>
                            <FiUsers size='24' />
                            <span>Candidates</span>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to='/assessments' className='menu-link'>
                            <BiBarChartSquare size='24' />
                            <span>Assessments</span>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to='/company-profile' className='menu-link'>
                            <AiOutlineHome size='24' />
                            <span>Company</span>
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to='/company-settings' className='menu-link'>
                            <FiSettings size='24' />
                            <span>Settings</span>
                        </Link>
                    </MenuItem>
                </MenuWrapper>
            </Menu>
        </Sidebar>
    )
}

export default DashboardSidebar