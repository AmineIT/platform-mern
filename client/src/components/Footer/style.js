import styled from 'styled-components'
import theme from '../../theme'

export const FooterContainer = styled.section`
    background-color: ${theme.colors.lightBlue};
    padding-left: 8.75vw;
    padding-right: 8.75vw;
    color: #8588A1;
`

export const FooterRow = styled.div`
    display: flex;
    padding-top: 2vw;
    padding-bottom: 2vw;
    border-bottom: 1px solid #b7c3d8;

    @media screen and (max-width: ${theme.breakpoints.md}){
        display: block;
    }

    @media screen and (max-width: 450px){
        padding-top: 40px;
        padding-bottom: 20px;
    }
`

export const FooterColOne = styled.div`
    width: 70%;

    @media screen and (max-width: 1320px){
        width: 60%
    }

    @media screen and (max-width: ${theme.breakpoints.md}){
        width: 100%;
    }
`

export const FooterContent = styled.div`
    width: 100%;

    & img {
        width: 15vw;
        height: auto;

        @media screen and (max-width: ${theme.breakpoints.md}){
            width: 200px
        }
    }

    & p {
        width: 50%;
        line-height: 1.4;

        @media screen and (max-width: ${theme.breakpoints.md}){
            width: 100%;
        }
    }
`

export const FooterColTwo = styled.div`
    width: 30%;
    text-align: right;

    @media screen and (max-width: 1320px){
        width: 40%
    }

    @media screen and (max-width: ${theme.breakpoints.md}){
        width: 100%;
    }
`

export const FooterLinks = styled.div`
    display: flex;
    justify-content: space-between;

    & a {
        ${theme.a};

        @media screen and (max-width: ${theme.breakpoints.md}){
            display: block;
            margin-bottom: 15px;
        }
    }

    @media screen and (max-width: ${theme.breakpoints.md}){
        display: block;
        text-align: left;
    }
`

export const FooterSubscription = styled.div`
    text-align: left;
    margin-top: 30px;
    margin-bottom: 30px;

    & span {
        margin-bottom: 10px;
        display: inline-block;
        font-weight: 300;
    }

    & div {
        display: flex;

        & input {
            width: 70%;
            height: 50px;
            border: 1px solid #37517E;
            text-indent: 10px;
            background-color: transparent;
            color: #37517E;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;

            &::placeholder {
                font-size: 16px;
                color: #8588A1;
                font-weight: 300;
            }
        }

        & button {
            background-color: #37517E;
            display: inline-flex;
            width: 30%;
            height: 54px;
            color: #fff !important;
            align-items: center;
            justify-content: center;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            border: none;
        }
    }
`

export const SocialMediaFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    & a {
        margin-left: 15px;
    }

    a:first-child {
        margin-left: 0px;
    }

    @media screen and (max-width: ${theme.breakpoints.md}){
        display: block;
        text-align: left;
    }
`

export const FooterSubtext = styled.div`
    padding-top: 1vw;
    padding-bottom: 1vw;
    text-align: center;

    @media screen and (max-width: 450px){
        padding-top: 20px;
        padding-bottom: 40px;
    }
`