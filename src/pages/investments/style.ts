import styled from "styled-components";
import { FIT } from "../../styles/layout";
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

export const Layout = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
    gap: 20px;

    ${FIT} {
        flex: 1 1 0;
        min-height: 0;
        grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
        grid-template-rows: minmax(0, 1fr);
        gap: 14px;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-width: 0;
    min-height: 0;

    ${FIT} {
        gap: 14px;
    }
`;

export const Cell = styled.div<{ $content?: boolean }>`
    min-width: 0;
    min-height: 0;

    ${FIT} {
        flex: ${(props) => (props.$content ? "1 1 auto" : "1 1 0")};
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

export const Money = styled.div<{ $tone?: "up" | "down" }>`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: flex-end;
    gap: 2px;
    font-family: ${theme.fonts.mono};

    strong {
        color: ${theme.colors.text};
        font-size: 14px;
        font-weight: 600;
    }

    span {
        color: ${(props) => (props.$tone === "up" ? theme.colors.positive : props.$tone === "down" ? theme.colors.negative : theme.colors.textMuted)};
        font-size: 11px;
    }
`;

export const AllocationRow = styled.li`
    display: flex;
    flex-direction: column;
    gap: 5px;

    ${FIT} {
        gap: 3px;
    }
`;

export const AllocationHead = styled.div`
    display: flex;
    justify-content: space-between;
    color: ${theme.colors.text};
    font-size: 13px;

    span {
        color: ${theme.colors.textMuted};
        font-family: ${theme.fonts.mono};
        font-size: 12px;
    }
`;

export const Track = styled.div`
    height: 8px;
    overflow: hidden;
    background: rgba(255,255,255,0.07);
    border-radius: 4px;
`;

export const Fill = styled.div`
    height: 100%;
    min-width: 2px;
    background: ${theme.gradients.brand};
    border-radius: 4px;
    transition: width 400ms ease;

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 12px;
    list-style: none;

    ${FIT} {
        gap: 8px;
    }
`;

export const Note = styled.p`
    color: ${theme.colors.textMuted};
    font-size: 13px;
    line-height: 1.5;

    ${FIT} {
        font-size: 12px;
        line-height: 1.3;
    }
`;

export const Small = styled.p`
    color: ${theme.colors.textFaint};
    font-size: 11px;
    line-height: 1.4;
`;

export const Message = styled.div`
    color: ${theme.colors.textMuted};
    font-size: 14px;
`;
