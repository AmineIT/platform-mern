import styled, { createGlobalStyle, css } from 'styled-components'
import theme from '../../theme'
import CheckIcon from '../../images/register-page/checkIcon.svg'

export const GlobalStyle = createGlobalStyle`
    body {
        background-color: #FAFBFD
    }
`

export const Container = styled.div`
    width: 1000px;
    margin: auto;
    padding-top: 32px;
    padding-bottom: 220px;
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
        position: absolute;
        right: -215px;
        top: 0px;
        font-weight: 100;
        color: #C4C4C4;
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

export const CTABlock = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const QuestionLibraryWrapper = styled.div`
    display: flex;
    position: relative;
    min-height: 550px;
    margin-bottom: ${theme.spacing.thirtyTwo};

    & input[type=checkbox] {
        height: 0;
        width: 0;
        visibility: hidden;
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

export const AssessmentQuestionsWrapper = styled.div`
    width: 400px;
    padding: 26px 33px;
    position: relative;
    border-right: 1px solid #EBECEE;
    padding-bottom: 50px;
    background-color: #f5f6f9;
    overflow-y: scroll;
`

export const QuestionContainer = styled.div`
    width: 100%;
    position: relative;
    padding-bottom: 150px;

    & div h5 {
        ${theme.h6};
        position: relative;
        border-bottom: 1px solid #EBECEE;
        padding-bottom: ${theme.spacing.twentyFour};
    }
`

export const Questions = styled.div`
    width: calc(100% - 400px);
    padding: 26px 60px 40px;
    position: relative;
    background-color: ${theme.colors.white};

    & div h5 {
        ${theme.h6};
        position: relative;
        border-bottom: 1px solid #EBECEE;
        padding-bottom: ${theme.spacing.twentyFour};
    }
`

export const QuestionsOptionsWrapper = styled.div`
    display: block;
    margin-top: ${theme.spacing.sixTeen};

    & div h6 {
        font-family: ${theme.font.basisProMedium};
        font-size: 14px;
        margin-bottom: ${theme.spacing.sixTeen};
    }
`

export const OptionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    margin-bottom: ${theme.spacing.thirtyTwo};
`

export const Option = styled.div`
    height: 95px;
`

export const OptionContent = styled.div`
    height: 95px;
    padding: 15px 10px 10px;
    min-width: 120px;
    text-align: center;
    transition: all 0.3s;
    border-radius: 4px;
    cursor: pointer;
    position: relative;

    ${({ checked }) => checked ? CheckedOption : null}

    &::after {
        ${({ checked }) => checked ? TypeChecked : null}
    }
    &::before {
        ${({ checked }) => checked ? CheckedIcon : null}
    }

    &:hover {
        background-color: #F6F6F6;

        & svg {
            color: ${theme.colors.primaryColor}
        }

        & p {
            color: ${theme.colors.primaryColor};
        }
    }

    & p {
        font-family: ${theme.font.basisProMedium};
        font-size: 14px;
        line-height: 1.3;
    }
`

export const PreviewContainer = styled.div`
    padding: 33px 0;
    overflow: auto;
    margin-top: 10px;
    max-height: 900px;
`

export const QuestionPreviewWrapper = styled.div`
    max-width: 100%;
    margin-bottom: 20px;
`

export const QuestionPreview = styled.div`
    color: ${theme.colors.black};
    border: 2px solid;
    border-color: ${theme.colors.primaryColor};
    cursor: pointer;
    padding: 16px 20px 16px 16px;
    position: relative;
    font-style: normal;
    font-weight: 600;
    line-height: 1.45;
    font-stretch: normal;
    border-radius: 8px;
    margin-bottom: 16px;
    letter-spacing: normal;
    background-color: #ffffff;
`

export const PreviewHeader = styled.div`
    display: flex;
    font-style: normal;
    align-items: center;
    line-height: normal;
    font-stretch: normal;
    margin-bottom: 12px;
    letter-spacing: 0.2px;
`

export const TypeContainer = styled.div`
    color: ${theme.colors.white};
    height: 32px;
    display: flex;
    padding: 4px 9px;
    font-size: 14px;
    align-items: center;
    font-weight: 700;
    line-height: 1;
    margin-right: 13px;
    border-radius: 4px;
    background-color: ${theme.colors.primaryColor};
    min-width: 65px;
`

export const AssessmentTitle = styled.div`
    color: ${theme.colors.black};
    overflow: hidden;
    font-size: 12px;
    font-weight: 700;
    margin-left: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-transform: uppercase;
`

export const PreviewActions = styled.div`
    top: 20px;
    right: 10px;
    display: flex;
    position: absolute;
    font-size: 18px;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%);
    align-items: center;
    padding-left: 75px;
`

export const QuestionText = styled.div`
    overflow: hidden;
    font-size: 12px;
    max-width: 100%;
    max-height: 45px;
    min-height: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
`

export const EmptyState = styled.div`
    margin-top: 120px;
    text-align: center;
    margin-bottom: 120px;

    & h4 {
        margin-bottom: ${theme.spacing.sixTeen};
        font-size: 1.2rem;
    }
    
    & p {
        color: ${theme.colors.primaryGrey};
        margin-bottom: ${theme.spacing.sixTeen};
    }
`

const CheckedOption = css`
    background-color: #F6F6F6;

    &::after {
        content: ''
    }

    & svg {
        color: ${theme.colors.primaryColor}
    }

    & p {
        color: ${theme.colors.primaryColor};
    }
`

const TypeChecked = css`
    content: '';
    position: absolute;
    right: -10px;
    top: -12px;
    height: 25px;
    width: 25px;
    background-color: ${theme.colors.primaryColor};
    border-radius: 50%;
    z-index: 999;
`

const CheckedIcon = css`
    content: '';
    position: absolute;
    right: -10px;
    top: -11px;
    height: 25px;
    width: 25px;
    z-index: 9999;
    background-image: url(${CheckIcon});
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
`