import styled from "styled-components";
import { theme } from "../../styles/theme";

export const MonthNav = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
`;

export const MonthLabel = styled.span`
    min-width: 150px;
    color: ${theme.colors.text};
    font-family: ${theme.fonts.display};
    font-size: 14px;
    font-weight: 600;
    text-align: center;
`;

export const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
`;

export const Stats = styled.div<{ $stale: boolean }>`
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) repeat(2, minmax(0, 1fr));
    gap: 20px;
    opacity: ${(props) => (props.$stale ? 0.55 : 1)};
    transition: opacity 150ms ease;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export const Cards = styled.div<{ $stale: boolean }>`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
    gap: 20px;
    opacity: ${(props) => (props.$stale ? 0.55 : 1)};
    transition: opacity 150ms ease;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 16px 18px;
    background: rgba(255,255,255,0.02);
    border: 1px solid ${theme.colors.hairline};
    border-radius: ${theme.radius.medium};
`;

export const CardHead = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
`;

export const CardTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;

    strong {
        color: ${theme.colors.text};
        font-size: 15px;
        font-weight: 600;
    }

    span {
        color: ${theme.colors.textMuted};
        font-size: 12px;
    }
`;

export const CardActions = styled.div`
    display: flex;
    gap: 6px;
`;

export const IconButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    color: ${theme.colors.textMuted};
    background: transparent;
    border: 1px solid transparent;
    border-radius: ${theme.radius.small};
    cursor: pointer;
    transition: color 120ms ease, background 120ms ease, border-color 120ms ease;

    &:hover {
        color: ${theme.colors.text};
        background: ${theme.colors.accentSoft};
        border-color: ${theme.colors.border};
    }

    &:focus-visible {
        outline: 2px solid ${theme.colors.accent};
        outline-offset: 2px;
    }

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
`;

export const Remaining = styled.div<{ $exceeded: boolean }>`
    color: ${(props) => (props.$exceeded ? theme.colors.negative : theme.colors.textMuted)};
    font-size: 13px;
`;

export const UnbudgetedList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
`;

export const UnbudgetedItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    background: rgba(255,255,255,0.02);
    border: 1px solid ${theme.colors.hairline};
    border-radius: ${theme.radius.small};
    color: ${theme.colors.text};
    font-size: 14px;

    span {
        color: ${theme.colors.textMuted};
        font-family: ${theme.fonts.mono};
        font-size: 13px;
    }
`;

export const UnbudgetedInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`;

export const Message = styled.div`
    color: ${theme.colors.textMuted};
    font-size: 14px;
`;
