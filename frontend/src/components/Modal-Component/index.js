import React from 'react'

import {
    ModalOverlay,
    ModalContent,
    Content,
    CloseBtn
} from './style'
import { RiCloseLine } from 'react-icons/ri'

const Modal = ({ onClose, show, children }) => {
    return (
        <ModalOverlay isOpen={show}>
            <CloseBtn onClick={onClose}>
                <RiCloseLine size='24' color='#dbdbde' />
            </CloseBtn>
            <ModalContent isOpen={show ? 'isOpen' : ''}>
                <Content>
                    {children}
                </Content>
            </ModalContent>
        </ModalOverlay>
    )
}

export default Modal