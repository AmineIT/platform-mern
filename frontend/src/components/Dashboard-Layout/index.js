import React from 'react'
import PropTypes from 'prop-types';

import DashboardNavbar from '../Dashboard-Navbar'
import DashboardSidebar from '../Dashboard-Sidebar'
import DashboardViews from '../Dashboard-Views'
import DashboardFooter from '../Dashboard-Footer'

const DashboardLayout = ({children, active, from}) => {
    return (
        <>
            <DashboardNavbar />
            <DashboardSidebar active={active} from={from} />
            <DashboardViews>
                {children}
            <DashboardFooter />
            </DashboardViews>
        </>
    )
}

DashboardLayout.protoTypes = {
    children: PropTypes.node
}

export default DashboardLayout