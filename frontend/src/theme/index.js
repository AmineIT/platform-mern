/**
 * Theme Options
 * Global theme options
 */

import colors from './colors'
import fontFamilies from './fontFamilies'

const theme = {
  colors,
  font: fontFamilies,
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
    fontSize: 64,
  },
  h2: {
    fontSize: 52,
  },
  h3: {
    fontSize: 38,
  },
  h4: {
    fontSize: 26,
  },
  h5: {
    fontSize: 24,
  },
  h6: {
    fontSize: 20,
  },
  body: {
    large: {
      fontSize: 24,
    },
    regular: {
      fontSize: 16,
    },
    small: {
      fontSize: 14,
    },
  },
  spacing: {
    eight: '8px',
    sixTeen: '16px',
    twentyFour: '24px',
    thirtyTwo: '32px',
    foutry: '40px',
    sixtyFour: '64px'
  },
  smallHeading: {
    fontSize: 12,
    lineHeight: 16,
    textTransform: 'uppercase'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    boxShadow: '2px 4px 15px rgba(0, 0, 0, 0.05)'
  }
}

export default theme
