import React from 'react'

import { OutlineBtn } from './style'

export const OutlineButton = ({href, text}) => {
    return (
        <OutlineBtn href={href}>
            {text}
        </OutlineBtn>
    )
}