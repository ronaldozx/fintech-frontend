import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Wrapper = styled.div`
    display: inline-flex;
    padding: 3px;
    background: rgba(4,8,18,0.7);
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radius.medium};
`;

export const Option = styled.button<{ $active: boolean }>`
    height: 32px;
    padding: 0 14px;
    color: ${(props) => (props.$active ? theme.colors.text : theme.colors.textMuted)};
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    background: ${(props) => (props.$active ? theme.colors.accentSoft : "transparent")};
    border: 1px solid ${(props) => (props.$active ? theme.colors.borderStrong : "transparent")};
    border-radius: 9px;
    cursor: pointer;
    transition: background 150ms ease, color 150ms ease, border-color 150ms ease;

    &:hover {
        color: ${theme.colors.text};
    }

    &:focus-visible {
        outline: 2px solid ${theme.colors.accent};
        outline-offset: 2px;
    }
`;
