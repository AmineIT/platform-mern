import styled, { css } from 'styled-components'
import theme from '../../theme'
import CheckIcon from '../../images/register-page/checkIcon.svg'

export const RegisterContainer = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    position: relative;

    @media screen and (max-width: ${theme.breakpoints.md}){
        display: block;
        height: auto;
    }

    & .fade-component-one {
        animation: fadeComponentOne .4s ease-in-out;
    }

    & .fade-component-two {
        animation: fadeComponentTwo .4s ease-in-out
    }

    & .fade-component-three {
        animation: fadeComponentThree .4s ease-in-out
    }

    @keyframes fadeComponentOne {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes fadeComponentTwo {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes fadeComponentThree {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .textarea {
        min-width: 600px;
        max-width: 600px;
    }

    .PhoneInputInput {
        border: none;
    } 

    .control.is-loading::after {
        top: 1.625em;
    }

    .control.has-icons-left .icon, .control.has-icons-right .icon {
        top: 1.5em;
        right: 5px;
        font-size: 1rem;
    }

    .help {
        font-size: .85rem;
        margin-top: 0;
    }
`

export const StepsDisplay = styled.div`
    position: absolute;
    top: 75px;
    right: 60px;

    @media screen and (max-width: ${theme.breakpoints.xs}){
        top: 65px;
        right: 20px;
    }

    & .step1 {
        position: absolute;
        top: -25px;
        left: 0px;
        background-color: ${theme.colors.primaryColor};
        display: block;
        width: 15px;
        height: 15px;
        border-radius: 50%;

        &::before {
            content: '';
            position: absolute;
            top: 6px;
            left: 0;
            width: 60px;
            height: 2px;
            background-color: ${theme.colors.primaryColor}
        }
    }

    & .step2 {
        position: absolute;
        top: -25px;
        left: 25px;
        background-color: #828282;
        display: block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
    }

    & .step3 {
        position: absolute;
        top: -25px;
        right: -2px;
        background-color: #828282;
        display: block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
    }

    & .active {
            background-color: ${theme.colors.primaryColor};
    }
`

export const RegisterColOne = styled.div`
    width: 30vw;
    height: 100%;
    background-color: ${theme.colors.lightBlue};

    @media screen and (max-width: 1230px){
        width: 40vw;
    }

    @media screen and (max-width: ${theme.breakpoints.md}){
        width: 80%;
        height: 130px;
        border-bottom-right-radius: 30px;
    }

    @media screen and (max-width: ${theme.breakpoints.sm}){
        width: 70%;
        height: 100px;
    }

    @media screen and (max-width: ${theme.breakpoints.xs}){
        width: 50%;
    }
`

export const LogoContainer = styled.div`
    padding: 40px;
    width: fit-content;

    @media screen and (max-width: ${theme.breakpoints.md}){
        padding-left: 60px;
    }

    @media screen and (max-width: ${theme.breakpoints.sm}){
        padding-top: 30px;
    }

    @media screen and (max-width: ${theme.breakpoints.xs}){
        padding-left: 15px;
    }

    & img {
        width: 220px;

        @media screen and (max-width: ${theme.breakpoints.sm}){
            width: 180px;
        }
    }
`

export const RegisterAssetSection = styled.div`
    width: fit-content;
    margin-top: 120px;

    @media screen and (max-width: ${theme.breakpoints.md}){
        display: none;
    }

    & img {
        width: 90%
    }
`

export const RegisterColTwo = styled.div`
    height: 100%;
    padding-left: 60px;
    width: 800px;

    @media screen and (max-width: 1230px){
        width: 1000px
    }

    @media screen and (max-width: ${theme.breakpoints.md}){
        width: 100%;
        padding-right: 60px;
        padding-bottom: 60px;
    }

    @media screen and (max-width: ${theme.breakpoints.xs}){
        width: 80%;
        padding-right: 0%;
        padding-left: 15px
    }
`

export const RegisterContent = styled.div`
    margin-top: 40px;
`

export const SuccessContent = styled.div`
    display: flex;
    align-items: center;
    height: 90vh;

    @media screen and (max-width: ${theme.breakpoints.md}){
        height: 100%;
        display: block;
        margin-top: 80px;
    }
`

export const RegisterHeading = styled.h1`
    font-size: 34px;
    margin: 0;

    @media screen and (max-width: ${theme.breakpoints.md}){
        font-size: 28px;
    }
`

export const RegisterSubtext = styled.p`
    font-size: 20px;
    color: #828282;
    margin-top: 10px;
`

export const RegisterForm = styled.div`
    margin-top: 80px;

    @media screen and (max-width: ${theme.breakpoints.md}){
        margin-top: 40px;
    }

    & .inputRadio {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    & .radio+.radio {
        @media screen and (max-width: ${theme.breakpoints.sm}){
            margin-left: 0px
        }
    }

    & .control:nth-of-type(3) {
        @media screen and (max-width: ${theme.breakpoints.sm}){
            margin-top: 0px !important;
        }
    }
`

export const Label = styled.p`
    margin: 0;
    font-size: 18px;
    font-weight: 400;
    position: relative;
    width: fit-content;

    &::after{
        ${({required}) => required ? requiredMark : null};
    }
`

export const RadioLabel = styled.span`
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    position: relative;
    width: fit-content;
    margin-top: -3px;

    &::after{
        ${({required}) => required ? requiredMark : null};
    }
`

export const AccountType = styled.div`
    width: 600px;
    height: 100px;
    border: 2px solid ${({active}) => active ? theme.colors.primaryColor : '#828282'};
    border-radius: 10px;
    margin: 30px 0;
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 30px;
    cursor: pointer;
    transition: .4s all;
    background-color: ${({active}) => active ? theme.colors.primaryColor : '#ffffff'};
    & p, & svg path {
        color: ${({active}) => active ? theme.colors.white : '#828282'};
        fill: ${({active}) => active ? theme.colors.white : '#828282'};
    }

    &::after {
        ${({active}) => active ? TypeChecked : null}
    }

    &::before {
        ${({active}) => active ? CheckedIcon : null}
    }

    @media screen and (max-width: ${theme.breakpoints.sm}){
        width: 500px
    }

    @media screen and (max-width: ${theme.breakpoints.xs}){
        width: 100%
    }
`

export const Type = styled.p`
    font-size: 24px;
    font-weight: 500;
    position: relative;
    width: fit-content;
    margin-left: 15px;
    color: #828282;
`

export const Loginlink = styled.p`
    font-size: 18px;
    margin-top: 30px;

    & a {
        color: ${theme.colors.primaryColor};
        font-weight: 600;
        text-decoration: underline;
    }
`

export const InputInlineSection = styled.div`
    width: 100%;
    margin-right: ${({right}) => right ? '0' : '20px'};
`

export const DragAndDropSection = styled.div`
    width: 600px;
    height: 100px;
    border-radius: 10px;
    background-color: #F0F2F5;
    display: flex;
    align-content: center;
    padding: 40px;
    margin: 20px 0 0;
    color: ${theme.colors.primaryColor};

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

export const VerificationText = styled.p`
    font-size: 16px;
    color: #8588A1;
    margin-top: 10px;
    width: 80%;
`

const requiredMark = css`
    content: '*';
    position: absolute;
    right: -15px;
    top: -5px;
    height: 100%;
    color: #ED4B4B;
`

const TypeChecked = css`
    content: '';
    position: absolute;
    right: -15px;
    top: -15px;
    height: 30px;
    width: 30px;
    background-color: ${theme.colors.primaryColor};
    border-radius: 50%;
`

const CheckedIcon = css`
    content: '';
    position: absolute;
    right: -15px;
    top: -15px;
    height: 30px;
    width: 30px;
    background-image: url(${CheckIcon});
    border-radius: 50%;
    z-index: 9;
    background-position: center;
    background-repeat: no-repeat;
`