import styled, { createGlobalStyle } from 'styled-components'
import theme from '../../theme'

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: #FAFBFD
    }
`

export const Container = styled.div`
    width: 1000px;
    margin: auto;
    padding-top: 32px;
    padding-bottom: 260px;
    position: relative;
`

export const LogoContainer = styled.div`
    text-align: center;

    & img {
        width: 160px;
    }
`

export const HeadingContainer = styled.div`
    margin-top: ${theme.spacing.thirtyTwo};
    margin-bottom: ${theme.spacing.thirtyTwo};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    & div {
        display: flex;
        align-items: center;
        position: absolute;
        left: 0;
        color: ${theme.colors.primaryGrey};
    }

    & h1 {
        ${theme.h5};
    }
`

export const FieldControl = styled.div`
    padding-bottom: ${theme.spacing.thirtyTwo};
    padding-top: ${theme.spacing.thirtyTwo};

    & .ql-editor {
        min-height: 200px;
    }

    & .ql-snow {
        background-color: #ffffff
    }

    & .required {
        position: relative;
        width: fit-content;

        &::after{
            content: '*';
            position: absolute;
            right: -10px;
            font-weight: 100;
            color: #ED4B4B;
        }
    }

    & .optional {
        position: relative;
        width: fit-content;

        &::after{
            content: '';
            position: absolute;
            right: -15px;
            top: 10px;
            width: 4px;
            height: 4px;
            font-weight: 100;
            background-color: #C4C4C4;
            border-radius: 50%;
        }

        &::before {
            content: 'Optional';
            position: absolute;
            right: -85px;
            font-weight: 100;
            color: #C4C4C4;
        }
    }

    & .field-body .field {
        min-width: 49%;
    }

    & .dropdown {
        width: 100%;

        & .dropdown-trigger {
            width: 100%;

            & button {
                width: 100%;
                justify-content: start;
            }
        }
    }

    & .control.has-icons-right .icon.is-right {
        right: 10px;
    }

    & .react-calendar {
        border: none;
    }
`

export const CheckBox = styled.input`
  padding: 0;
  height: initial;
  width: initial;
  margin-bottom: 0;
  display: none;
  cursor: pointer;

  & label {
    position: relative;
    cursor: pointer;
  }

  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  & + label:before {
    content:'';
    -webkit-appearance: none;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.primaryGrey};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 10px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 8px;
    border-radius: 5px;
  }

  &:checked + label:before {
    background-color: ${theme.colors.primaryColor};
    border: 1px solid ${theme.colors.primaryColor};
  }
  
  &:checked + label:after {
    content: '';
    display: block;
    position: absolute;
    top: 3px;
    left: 8px;
    width: 6px;
    height: 14px;
    border: solid ${theme.colors.white};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`

export const Label = styled.label`
    color: ${theme.colors.primaryGrey};
    font-family: ${theme.font.basisProMedium};
`

export const AssessmentSection = styled.div`
    width: 100%;
    height: 200px;
    border: 2px dashed ${theme.colors.primaryColor};
    background-color: ${theme.colors.white};
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-top: ${theme.spacing.thirtyTwo};

    & h1 {
        ${theme.h5};
        color: ${theme.colors.primaryColor};
        margin-bottom: ${theme.spacing.eight};
    }

    & p {
        color: ${theme.colors.primaryGrey};
        margin-bottom: ${theme.spacing.eight};
    }
`

export const ModalContent = styled.div`
    display: block;
`

export const ModalHeading = styled.h1`
    ${theme.h5};
    color: ${theme.colors.black};
    margin-bottom: ${theme.spacing.twentyFour};
`

export const AssessmentCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${theme.spacing.thirtyTwo};
    margin-bottom: ${theme.spacing.sixTeen};
    background-color: ${({ brandColor }) => brandColor ? brandColor : '#ffffff'};
    border: 1px solid ${({ brandColor }) => brandColor ? brandColor : theme.colors.lightGrey};
    color: ${({ brandColor }) => brandColor ? '#ffffff' : '#000000'};
    border-radius: 4px;
    cursor: pointer;
`

export const AssessmentCheckBox = styled.div`
    
    & [type="radio"]:checked, [type="radio"]:not(:checked) {
        position: absolute;
        left: -9999px;
    }

    & [type="radio"]:checked + label, [type="radio"]:not(:checked) + label {
        position: relative;
        padding-left: 28px;
        cursor: pointer;
        line-height: 20px;
        display: inline-block;
        color: ${({ brandColor }) => brandColor ? '#ffffff' : '#000000'};
    }

    & [type="radio"]:checked + label:before, [type="radio"]:not(:checked) + label:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 18px;
        height: 18px;
        border: 1px solid #ddd;
        border-radius: 100%;
        background: #fff;
    }
    
    & [type="radio"]:checked + label:after, [type="radio"]:not(:checked) + label:after {
        content: '';
        width: 12px;
        height: 12px;
        background: ${({ brandColor }) => brandColor ? brandColor : theme.colors.primaryColor};
        position: absolute;
        top: 3px;
        left: 3px;
        border-radius: 100%;
        -webkit-transition: all 0.2s ease;
        transition: all 0.2s ease;
    }

    & [type="radio"]:not(:checked) + label:after {
        opacity: 0;
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    & [type="radio"]:checked + label:after {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }
`

export const AssessmentCTA = styled.div`
    display: flex;
    align-items: center;
`

export const CTABlock = styled.div`
    position: ${({ position }) => position === 'absolute' ? 'absolute' : 'fixed'};
    bottom: 30px;
    width: 1000px;
    height: 100px;
    z-index: 9999;
    ${theme.card};
    display: flex;
    align-items: center;
    justify-content: center;
`