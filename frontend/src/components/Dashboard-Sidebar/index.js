import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateSteps } from '../../actions/authActions'

import { Steps } from 'intro.js-react'
import "intro.js/introjs.css"
import { Sidebar, Menu, MenuWrapper, MenuItem } from './style'
import { RiDashboardLine } from 'react-icons/ri'
import { BiBriefcaseAlt2, BiBarChartSquare } from 'react-icons/bi'
import { FiUsers, FiSettings } from 'react-icons/fi'
import { AiOutlineHome } from 'react-icons/ai'

const DashboardSidebar = ({ active, from, updateSteps, user }) => {

    const [stepsEnabled, setStepsEnabled] = useState(true)

    const steps = [
        {
            element: ".sidebar",
            intro: "A quick access to your tasks.",
            position: 'right'
        },
        {
            element: ".dashboard-profile-step",
            intro: "Edit your profile so that people can find you easily.",
            position: "top"
        },
        {
            element: ".create-job-step",
            intro: "Create your first job.",
            position: "top"
        },
        {
            element: ".assessment-step",
            intro: "Create, see and edit assessments.",
            position: "top"
        },
        {
            element: ".feedback",
            intro: "Talk to us if you have any query.",
            position: "top"
        }
    ]

    const options = {
        showStepNumbers: false,
        showProgress: true,
        overlayOpacity: 0.4,
        exitOnOverlayClick: false
    }

    const onComplete = () => {
        setStepsEnabled(false)
        document.getElementById('sidebar').style.position = 'fixed'
        updateSteps()
    }

    const onExit = () => {
        setStepsEnabled(false)
        document.getElementById('sidebar').style.position = 'fixed'
    }

    const onStart = () => {
        document.getElementById('sidebar').style.position = 'absolute'
    }

    return (
        <Sidebar id='sidebar'>
            <Steps
                enabled={user.steps}
                stepsEnabled={stepsEnabled}
                steps={steps}
                initialStep={0}
                options={options}
                onExit={onExit}
                onComplete={onComplete}
                onStart={onStart} />

            <Menu className='sidebar'>
                <MenuWrapper>
                    <MenuItem active={active && from === 'company-dashboard' ? active : false}>
                        <Link to='/company-dashboard' className='menu-link'>
                            <RiDashboardLine size='24' />
                            <span>Dashboard</span>
                        </Link>
                    </MenuItem>
                    <MenuItem active={active && from === 'jobs' ? active : false}>
                        <Link to='/jobs' className='menu-link'>
                            <BiBriefcaseAlt2 size='24' />
                            <span>Jobs</span>
                        </Link>
                    </MenuItem>
                    <MenuItem active={active && from === 'candidates' ? active : false}>
                        <Link to='/candidates' className='menu-link'>
                            <FiUsers size='24' />
                            <span>Candidates</span>
                        </Link>
                    </MenuItem>
                    <MenuItem active={active && from === 'assessments' ? active : false}>
                        <Link to='/assessments' className='menu-link'>
                            <BiBarChartSquare size='24' />
                            <span>Assessments</span>
                        </Link>
                    </MenuItem>
                    <MenuItem active={active && from === 'company-profile' ? active : false}>
                        <Link to='/company-profile' className='menu-link'>
                            <AiOutlineHome size='24' />
                            <span>Company</span>
                        </Link>
                    </MenuItem>
                    <MenuItem active={active && from === 'profile-settings' ? active : false}>
                        <Link to='/profile-settings' className='menu-link'>
                            <FiSettings size='24' />
                            <span>Settings</span>
                        </Link>
                    </MenuItem>
                </MenuWrapper>
            </Menu>
        </Sidebar>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { updateSteps })(DashboardSidebar)