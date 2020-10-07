import React from 'react'
import PropTypes from 'prop-types';

import DashboardNavbar from '../Dashboard-Navbar'
import DashboardSidebar from '../Dashboard-Sidebar'
import DashboardViews from '../Dashboard-Views'
import DashboardFooter from '../Dashboard-Footer'

const DashboardLayout = ({children}) => {
    return (
        <>
            <DashboardNavbar />
            <DashboardSidebar />
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