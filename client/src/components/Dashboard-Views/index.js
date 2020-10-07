import React from 'react'
import PropTypes from 'prop-types'

import { Layout, Content } from './style'

const DashboardViews = ({children}) => {
    return (
        <Layout>
            <Content>
                {children}
            </Content>
        </Layout>
    )
}

DashboardViews.propTypes = {
    children: PropTypes.node
}

export default DashboardViews