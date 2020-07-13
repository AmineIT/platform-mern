import React from 'react'

import { Button } from './style'

const PrimaryButton = ({href, text, size, onClick, className, transparent}) => {
    return (
        <Button className={className} href={href} size={size} onClick={onClick} transparent={transparent}>
            {text}
        </Button>
    )
}

export default PrimaryButton