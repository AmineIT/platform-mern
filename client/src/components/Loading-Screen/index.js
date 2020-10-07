import React from 'react'
import { motion } from "framer-motion"

import { LoadingContainer, ContentContainer } from './style'
import Logo from '../../images/selfstarter-logo/selfstarter-logo.svg'
import ScaleLoader from 'react-spinners/ScaleLoader'

const LoadingScreen = () => {

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    }
    
    return (
        <motion.div initial="visible" animate='hidden' variants={variants} transition={{duration: 1.5, delay: .5}}>
            <LoadingContainer>
                <ContentContainer>
                    <motion.div initial="visible" animate='hidden' variants={variants} transition={{duration: 1.5}}>
                        <img src={Logo} alt='Selfstarter Logo' />
                        <ScaleLoader color='#1C65E3' />
                    </motion.div>
                </ContentContainer>
            </LoadingContainer>
        </motion.div>
    )
}

export default LoadingScreen