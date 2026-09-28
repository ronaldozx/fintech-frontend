import styled from "styled-components";
import { theme } from "../../styles/theme";

export const DefaultButtonStyle = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 40px;
    padding: 0 14px;
    color: ${theme.colors.text};
    background: rgba(255,255,255,0.03);
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radius.medium};
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;
    transition: transform 150ms ease, border-color 150ms ease, box-shadow 150ms ease, background 150ms ease;

    &:hover {
        transform: translateY(-1px);
        background: ${theme.colors.accentSoft};
        border-color: ${theme.colors.borderStrong};
        box-shadow: ${theme.glow.accent};
    }

    &:active {
        transform: translateY(0);
    }

    &:focus-visible {
        outline: 2px solid ${theme.colors.accent};
        outline-offset: 2px;
    }

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
        background: rgba(255,255,255,0.03);
    }
`;
