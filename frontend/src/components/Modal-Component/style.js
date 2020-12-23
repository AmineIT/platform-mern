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

export const Content = styled.div`
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

const showModal = css`
    opacity: 1;
    transform: translateY(0) scale(1);
`