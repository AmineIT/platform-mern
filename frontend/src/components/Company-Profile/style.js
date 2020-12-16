import styled from 'styled-components'
import theme from '../../theme'

export const FlexWrapper = styled.div`
    display: flex;
    align-items: end;
`

export const Heading = styled.h1`
    ${theme.h4};
    padding-top: 40px;
`

export const SettingsContainer = styled.div`
    padding: ${theme.spacing.sixTeen};
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.lightGrey};
    border-radius: 4px;
`

export const LogoContainer = styled.div`
    display: flex;

    & .is-rounded {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        border: 2px solid ${theme.colors.primaryColor};
    }
`
export const FieldControl = styled.div`
    padding-bottom: ${theme.spacing.sixTeen};
    padding-top: ${theme.spacing.sixTeen};
    width: 100%;

    & .label {
        color: ${theme.colors.primaryGrey};
        font-family: ${theme.font.basisProLight};
    }

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
        cursor: pointer;
        pointer-events: auto;
    }
`

export const ColorPreview = styled.div`
    width: 100px;
    height: 40px;
    border: 4px solid ${theme.colors.lightGrey};
    background-color: ${({ bg }) => bg ? bg : ''};
    cursor: pointer;
    border-radius: 4px;
`

export const SocialMedia = styled.div`
    display: flex;
    align-items: center;
    ${theme.card};
    border: 1px solid ${theme.colors.lightGrey};
    width: fit-content;
    margin-top: ${theme.spacing.eight};
    position: relative;
    
    & div {
        padding: ${theme.spacing.sixTeen};
        transition: all .2s ease-in-out;
        color: ${theme.colors.primaryColor};
        display: flex;
        cursor: pointer;
    }

    & div:hover {
        background-color: ${theme.colors.lightBlue};
    }

    & .hideSocialMedia {
        position: absolute;
        right: -5px;
        top: -25px;
        width: 20px;
        height: 20px;
        display: block;

        &:hover {
            background-color: ${theme.colors.white};
        }
    }
`

export const DragAndDropSection = styled.div`
    width: auto;
    height: 200px;
    border-radius: 10px;
    border: 3px dashed ${theme.colors.navyBlue};
    background-color: ${theme.colors.white};
    display: flex;
    align-content: center;
    justify-content: center;
    color: ${theme.colors.primaryColor};
    cursor: pointer;

    & span {
        margin-right: 8em;
    }

    @media screen and (max-width: ${theme.breakpoints.sm}){
        width: 470px;
        padding: 20px
    }

    @media screen and (max-width: ${theme.breakpoints.xs}){
        width: 100%;
        display: block;
        height: auto;
    }
`

export const DragAndDropContent = styled.div`
    text-align: center;
    display: flex;
    align-items: center;

    @media screen and (max-width: ${theme.breakpoints.xs}){
        display: block;
    }

    & svg, span {
        @media screen and (max-width: ${theme.breakpoints.xs}){
            display: none;
        }
    }
`

export const SelectFile = styled.div`
    width: 140px;
    height: 40px;
    border: 2px solid ${theme.colors.primaryColor};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @media screen and (max-width: ${theme.breakpoints.sm}){
        width: 190px;
        margin-right: 40px
    }

    @media screen and (max-width: ${theme.breakpoints.xs}){
        width: 100%;
    }
`

export const NotificationsWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: ${theme.spacing.twentyFour};
    padding-top: ${theme.spacing.twentyFour};
    border-bottom: 1px solid ${theme.colors.lightGrey};

    & h1 {
        ${theme.h6};
    }

    & p {
        font-size: 16px;
        color: ${theme.colors.primaryGrey}
    }

    & input[type=checkbox] {
        height: 0;
        width: 0;
        visibility: hidden;
        display: none;
    }

    & label {
        cursor: pointer;
        text-indent: -9999px;
        width: 50px;
        height: 30px;
        background: grey;
        display: block;
        border-radius: 100px;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            top: 5px;
            left: 5px;
            width: 20px;
            height: 20px;
            background: #fff;
            border-radius: 90px;
            transition: 0.3s;
        }
    }

    input:checked + label {
        background: ${theme.colors.primaryColor};
    }

    input:checked + label:after {
        left: calc(100% - 5px);
        transform: translateX(-100%);
    }

    label:active:after {
        width: 30px;
    }
`