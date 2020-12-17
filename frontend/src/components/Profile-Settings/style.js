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

    & .has-text-link {
        color: ${theme.colors.primaryColor} !important;
        font-family: ${theme.font.basisProMedium};
        text-decoration: underline;
    }

    & .has-text-link:hover {
            color: ${theme.colors.primaryColor} !important;
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