import styled from 'styled-components'

export const LoadingContainer = styled.div`
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #f1f1f1;
    z-index: 9999;
    overflow: hidden;
    display: flex;
`

export const ContentContainer = styled.div`
    width: 100%;
    text-align: center;

    & img {
        width: 150px;
        margin-bottom: 10px;
    }
`