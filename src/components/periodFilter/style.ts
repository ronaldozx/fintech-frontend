import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Options = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const Option = styled.button<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    color: ${(props) => (props.$selected ? theme.colors.text : theme.colors.textMuted)};
    font-size: 14px;
    font-weight: ${(props) => (props.$selected ? 600 : 400)};
    text-align: left;
    background: transparent;
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

export const Check = styled.span`
    width: 16px;
    color: ${theme.colors.accent};
`;
