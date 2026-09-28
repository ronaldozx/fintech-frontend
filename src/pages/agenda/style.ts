import styled from "styled-components";
import { theme } from "../../styles/theme";

export const ROW_HEIGHT = 56;
export const ROW_GAP = 8;

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

export const Row = styled.li`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 14px;
    min-height: ${ROW_HEIGHT}px;
    padding: 8px 14px;
    background: rgba(255,255,255,0.02);
    border: 1px solid ${theme.colors.hairline};
    border-radius: ${theme.radius.medium};
`;

export const DateBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 64px;

    strong {
        color: ${theme.colors.text};
        font-family: ${theme.fonts.mono};
        font-size: 15px;
        font-weight: 700;
    }

    span {
        color: ${theme.colors.textMuted};
        font-size: 11px;
        white-space: nowrap;
    }
`;

export const Icon = styled.div<{ $tone: "bill" | "recurring" | "goal" }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    color: ${(props) => (props.$tone === "bill" ? theme.colors.negative : props.$tone === "goal" ? theme.colors.positive : theme.colors.accent)};
    background: rgba(255,255,255,0.04);
    border: 1px solid ${theme.colors.border};
    border-radius: 10px;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;

    strong {
        overflow: hidden;
        color: ${theme.colors.text};
        font-size: 14px;
        font-weight: 600;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    span {
        overflow: hidden;
        color: ${theme.colors.textMuted};
        font-size: 12px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const Amount = styled.div`
    flex-shrink: 0;
    color: ${theme.colors.text};
    font-family: ${theme.fonts.mono};
    font-size: 14px;
    font-weight: 600;
`;

export const Message = styled.div`
    color: ${theme.colors.textMuted};
    font-size: 14px;
`;
