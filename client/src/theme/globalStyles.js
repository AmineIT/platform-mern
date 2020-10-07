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
`;
 
export default GlobalStyle;