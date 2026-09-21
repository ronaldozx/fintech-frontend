import styled from "styled-components";
import { theme } from "../../styles/theme";

export const ToggleButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    color: ${theme.colors.textMuted};
    background: transparent;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px;
    transition: background 120ms ease, color 120ms ease;

    &:hover {
        background: rgba(255,255,255,0.03);
        color: ${theme.colors.text};
    }

    &:focus-visible {
        outline: 2px solid ${theme.colors.accent};
        outline-offset: 2px;
    }
`;
