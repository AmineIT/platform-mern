import { createGlobalStyle } from 'styled-components'
import theme from './index'

import {
  BasisGrotesqueProRegularTTF,
  BasisGrotesqueProRegularWOFF,
  BasisGrotesqueProRegularWOFF2,
  BasisGrotesqueProRegularEOT,
  BasisGrotesqueProLightTTF,
  BasisGrotesqueProLightWOFF,
  BasisGrotesqueProLightWOFF2,
  BasisGrotesqueProLightEOT,
  BasisGrotesqueProBoldTTF,
  BasisGrotesqueProBoldWOFF,
  BasisGrotesqueProBoldWOFF2,
  BasisGrotesqueProBoldEOT,
  BasisGrotesqueProMediumTTF,
  BasisGrotesqueProMediumWOFF,
  BasisGrotesqueProMediumWOFF2,
  BasisGrotesqueProMediumEOT,
} from './fonts'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: ${theme.font.basisProRegular};
    font-style: normal;
    font-weight: normal;
    src: local(${theme.font.basisProRegular}), 
          local(${theme.font.basisProRegular}), 
          url(${BasisGrotesqueProRegularTTF}) format("truetype"), 
          url(${BasisGrotesqueProRegularWOFF}) format("woff"),
          url(${BasisGrotesqueProRegularWOFF2}) format("woff2"),
          url(${BasisGrotesqueProRegularEOT}) format("eot");
  } 

  @font-face {
   font-family: ${theme.font.basisProMedium};
   font-style: normal;
   font-weight: normal;
   src: local(${theme.font.basisProMedium}), 
        local(${theme.font.basisProMedium}), 
        url(${BasisGrotesqueProMediumTTF}) format("truetype"), 
        url(${BasisGrotesqueProMediumWOFF}) format("woff"),
        url(${BasisGrotesqueProMediumWOFF2}) format("woff2"),
        url(${BasisGrotesqueProMediumEOT}) format("eot");
 }
 
 @font-face {
   font-family: ${theme.font.basisProLight};
   font-style: normal;
   font-weight: normal;
   src: local(${theme.font.basisProLight}), 
        local(${theme.font.basisProLight}), 
        url(${BasisGrotesqueProLightTTF}) format("truetype"), 
        url(${BasisGrotesqueProLightWOFF}) format("woff"),
        url(${BasisGrotesqueProLightWOFF2}) format("woff2"),
        url(${BasisGrotesqueProLightEOT}) format("eot");
 }

 @font-face {
   font-family: ${theme.font.basisProBold};
   font-style: normal;
   font-weight: normal;
   src: local(${theme.font.basisProBold}), 
        local(${theme.font.basisProBold}), 
        url(${BasisGrotesqueProBoldTTF}) format("truetype"), 
        url(${BasisGrotesqueProBoldWOFF}) format("woff"),
        url(${BasisGrotesqueProBoldWOFF2}) format("woff2"),
        url(${BasisGrotesqueProBoldEOT}) format("eot");
 }

  body {
    margin: 0;
    padding: 0;
    font-family: ${theme.font.basisProRegular};
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: 600;
  }

  hr {
    margin: 0;
  }

  .react-tabs__tab-list {
    align-items: center;
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: flex-start;
    margin-top: ${theme.spacing.twentyFour};
    margin-bottom: ${theme.spacing.twentyFour};
  }

  .react-tabs__tab {
    padding: .5em 1em;
    cursor: pointer;
    color: ${theme.colors.primaryGrey};
    font-family: ${theme.font.basisProMedium};
  }

  .react-tabs__tab--selected {
    border-bottom-color: ${theme.colors.primaryColor};
    border-bottom-style: solid;
    border-bottom-width: 2px;
    color: ${theme.colors.black};
  }

  .introjs-tooltiptext {
    color: ${theme.colors.primaryColor};
    font-family: ${theme.font.basisProMedium};
    font-size: 14px;
  }

  .introjs-progressbar, .Toastify__toast--info {
    background-color: ${theme.colors.primaryColor}
  }

  .Toastify__toast--success {
    background-color: ${theme.colors.green}
  }

  .__react_component_tooltip {
    color: ${theme.colors.white} !important;
  }

  .Toastify__toast--error, .button.is-danger, .button.is-danger:hover {
    background-color: ${theme.colors.red}
  }

  span.dropdown-item {
    cursor: pointer;
  }

  a.dropdown-item:hover, button.dropdown-item:hover, span.dropdown-item:hover {
    background-color: whitesmoke;
    color: #0a0a0a;
  }

  .pagination span {
    cursor: pointer;
  }

  .css-yk16xz-control, .css-1pahdxg-control {
    width: 180px;
  }

  .css-1pahdxg-control:hover {
    border-color: ${theme.colors.primaryColor}
  }

  .modal-background {
    background-color: rgb(10 10 10 / 60%);
  }
`;

export default GlobalStyle;