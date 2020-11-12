import React from 'react'

import Header from '../Header/index'
import Footer from '../Footer/index'


const Layout = (props) => {
    return (
        <>
            <Header/>
                {props.children}
            <Footer/>
        </>
    )
}

export default Layout