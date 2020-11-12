import styled, { css } from 'styled-components'
import theme from '../../theme'

export const ModalOverlay = styled.div`
    background-color: ${theme.colors.overlay};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${({ isOpen }) => isOpen ? 999999 : -1};
    overflow: hidden;
    transition: opacity 0.2s ease;
    transition-delay: 0.2s;
    opacity: ${({ isOpen }) => isOpen ? 1 : 0};
`

export const ModalContent = styled.div`
    background: #fff;
    margin-top: 40px;
    border-radius: 12px 12px 0 0;
    height: calc(100vh - 40px);
    overflow-y: scroll;
    opacity: 0;
    transform: translateY(15%) scale(0.98);
    transition: opacity 0.2s ease, transform 0.3s ease;
    transition-delay: 0.2s;
    position: relative;
    ${({ isOpen }) => isOpen ? showModal : null};
`

export const ResultContent = styled.div`
    padding: 64px 120px;
    transition: padding 0.25s linear;
    transition-delay: 0.15s;
    
    & .react-tabs {
        & .react-tabs__tab-list {
            border-bottom: 1px solid ${theme.colors.lightGrey};
        }
    }

    & .heading {
        border-bottom: 2px solid #000;
        ${theme.h6};
        text-transform: none;
        letter-spacing: 0px;
    }

    & .summary {
        line-height: 1.5
    }
`

export const CloseBtn = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

export const InfoSection = styled.div`
    display: flex;
    justify-content: start;

    & .avatar {
        margin-right: ${theme.spacing.twentyFour};
    }

    & h1 {
        ${theme.h6};
        margin-bottom: -10px;
    }

    & p {
        font-size: 14px;
        color: ${theme.colors.primaryGrey}
    }

    & .email, .phone {
        color: ${theme.colors.primaryColor}
    }
`

export const ImagePlaceholder = styled.div`
    background-color: ${theme.colors.lightBlue};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 96px;
    height: 96px;

    & p {
        font-weight: 700;
        color: ${theme.colors.primaryColor};
        font-size: 22px;
    }
`

export const WorkExperience = styled.div`
    padding-left: ${theme.spacing.eight};
    border-bottom: 1px solid ${theme.colors.lightGrey};

    &:last-of-type {
        border-bottom: none;
    }

    & .columns {
        margin-bottom: 0;
    }

    & .column {
        flex-grow: 0;
        flex-basis: auto;
        margin-bottom: -10px;
    }

    & .experience-info {
        display: flex;
        align-items: center;

        & p {
            color: ${theme.colors.primaryGrey};
            font-family: ${theme.font.basisProMedium}
        }

        & svg {
            margin-top: -2px;
            margin-right: 5px;
        }
    }

    & .description {
        line-height: 1.5
    }
`

const showModal = css`
    opacity: 1;
    transform: translateY(0) scale(1);
`