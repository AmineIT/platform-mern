import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { StyledPrimaryButton, StyledLightButton, StyledButton, StyledOutlineButton, StyledLoadingButton } from './style'

const handleRender = (Component, props) => {
    const { children, disabled, as, to, href, type, align, fit } = props;
    const { primary, light, loading, outline, ...rest } = props;
    const asElement = to ? Link : href ? 'a' : as

    const button = (
        <Component
          {...rest}
          type={type}
          disabled={disabled}
          as={asElement}
          align={align}
          fit={fit}
          className={`button ${loading ? 'is-loading' : ''}`} >
            {children}
        </Component>
    )
    return button
}

const Button = ({...props}) => {
    if (props.primary)
        return handleRender(StyledPrimaryButton, {...props})
    if (props.light)
        return handleRender(StyledLightButton, {...props})
    if (props.outline)
        return handleRender(StyledOutlineButton, {...props})

    return handleRender(StyledButton, {...props})
}

Button.propTypes = {
    as: PropTypes.elementType,
    type: PropTypes.oneOf(['button', 'submit']),
    target: PropTypes.string,
    href: PropTypes.string,
    to: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large', 'block']),
    primary: PropTypes.bool,
    light: PropTypes.bool,
    fit: PropTypes.oneOf(['stretched'])
}

export default Button