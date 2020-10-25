import styled, { css } from 'styled-components'
import theme from '../../theme'

export const StyledButton = styled.button`
  border-radius: 5px;
  outline: none;
  box-shadow: none;
  box-sizing: border-box;

  border: 1px solid ${theme.colors.primaryColor};

  position: relative;
  cursor: pointer;
  background-color: ${theme.colors.primaryColor};
  color: ${theme.colors.white};

  font-size: 18px;
  font-weight: 500;
  padding: 0 16px;
  margin-left: ${({align}) => (align === 'left' ? '32px' : null)};
  margin-right: ${({align}) => (align === 'right' ? '32px' : null)};
  height: 45px;
  font-family: ${theme.font.basisProMedium};

  ${({ size }) => (size === 'large' ? LargeBtn : (size === 'medium' ? MediumBtn : (size === 'small' ? SmallBtn : BlockBtn)))};
  width: ${({ fit }) => fit === 'stretched' ? 'auto' : null};

  &:disabled,
  &[disabled],
  &[isLoading] {
    opacity: 0.8;
    cursor: default;
    pointer-events: none;
  }

  &:focus {
    color: ${theme.colors.white}
  }

  &:hover {
      color: ${theme.colors.white};
      border-color: transparent;
  }

  & > div {
    display: flex;
  }

  @media screen and (max-width: ${theme.breakpoints.xs}){
      width: 100%;
      margin-bottom: 10px;
  }
`

export const StyledPrimaryButton = styled(StyledButton)`
  color: ${theme.colors.white};
  background-color: ${theme.colors.primaryColor};
`

export const StyledLightButton = styled(StyledButton)`
  color: ${theme.colors.primaryColor};
  background-color: ${theme.colors.lightBlue};
  border: 1px solid ${theme.colors.lightBlue};

  &:hover {
        color: ${theme.colors.primaryColor};
        border-color: transparent;
  }
`

export const StyledOutlineButton = styled(StyledButton)`
  color: ${theme.colors.primaryColor};
  background-color: ${theme.colors.white};
  border: 1.5px solid ${theme.colors.primaryColor};

  &:hover {
        color: ${theme.colors.primaryColor};
        border: 1.5px solid ${theme.colors.primaryColor};
  }
`

export const StyledLoadingButton = styled(StyledButton)`
  color: ${theme.colors.white};
  background-color: ${theme.colors.primaryColor};
  border: 1px solid ${theme.colors.primaryColor};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
        color: ${theme.colors.primaryColor};
        border-color: transparent;
  }
`

const BlockBtn = css`
    width: 100%;
    height: 60px;
    font-size: 20px;
`

const LargeBtn = css`
    width: 250px;
    height: 70px;
    font-size: 22px;
`

const MediumBtn = css`
    width: 190px;
    height: 60px;
    font-size: 18px;
`

const SmallBtn = css`
    width: 170px;
    height: 45px;
    font-size: 18px;
`