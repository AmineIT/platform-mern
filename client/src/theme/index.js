/**
 * Theme Options
 * Global theme options
 */

import colors from './colors'

const theme = {
  colors,
  bg: {
    primary: colors.primaryColor,
    lightBlue: colors.lightBlue,
    darkBlue: colors.darkBlue,
    overlay: colors.overlay,
    dark: colors.black,
    light: colors.white,
  },
  breakpoints: {
    xs: '640px',
    sm: '767px',
    md: '991px',
    lg: '1024px',
    xl: '1280px',
  },
  minBreakpoints: {
    xs: '641px',
    sm: '768px',
    md: '992px',
    lg: '1025px',
    xl: '1281px',
  },
  baseFontSize: 16,
  baseLineHeight: '',
  bodyColor: colors.black,
  reset: {
    padding: '0px',
    margin: '0px',
  },
  ul: {
    listStyle: 'none',
    padding: '0px',
    margin: '0px',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  h1: {
    fontSize: 90,
  },
  h2: {
    fontSize: 70,
  },
  h3: {
    fontSize: 50,
  },
  h4: {
    fontSize: 40,
  },
  h5: {
    fontSize: 30,
  },
  h6: {
    fontSize: 20,
  },
  body: {
    large: {
      fontSize: 40,
    },
    medium: {
      fontSize: 35,
    },
    regular: {
      fontSize: 24,
    },
  },
  spacing: {
    xs: 15,
    sm: 30,
    md: 60,
    lg: 120,
    xl: 240,
  },
  smallHeading: {
    fontSize: 15,
    lineHeight: 16,
    textTransform: 'uppercase',
    marginBottom: 30,
  },
  button: {
    primary: {
      buttonColor: colors.primaryColor,
      color: colors.white,
    },
    outline: {
      buttonColor: 'transparent',
    },
  },
}

export default theme
