import styled from "styled-components";
import { FIT } from "../../styles/layout";
import { theme } from "../../styles/theme";

export const Wrapper = styled.label`
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
`;

export const Label = styled.span`
    font-family: ${theme.fonts.display};
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${theme.colors.textMuted};
`;

export const Select = styled.select`
    width: 100%;
    height: 44px;
    padding: 0 12px;

    ${FIT} {
        height: 38px;
    }

    color: ${theme.colors.text};
    font-family: inherit;
    font-size: 14px;
    background: rgba(4,8,18,0.7);
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radius.medium};
    color-scheme: dark;
    transition: border-color 150ms ease, box-shadow 150ms ease;

    &:hover {
        border-color: ${theme.colors.borderStrong};
    }

    &:focus-visible {
        outline: none;
        border-color: ${theme.colors.accent};
        box-shadow: 0 0 0 3px ${theme.colors.accentSoft};
    }
`;
