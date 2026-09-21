import styled from "styled-components";
import { theme } from "../../styles/theme";

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

export const Grid = styled.div<{ $stale: boolean }>`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
    gap: 20px;
    opacity: ${(props) => (props.$stale ? 0.55 : 1)};
    transition: opacity 150ms ease;
`;

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style: none;
`;

export const Row = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    background: rgba(255,255,255,0.02);
    border: 1px solid ${theme.colors.hairline};
    border-radius: ${theme.radius.small};
`;

export const RowInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
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
        color: ${theme.colors.textMuted};
        font-size: 12px;
    }
`;

export const RowAmount = styled.div<{ $tone?: "up" | "down" }>`
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    gap: 6px;
    color: ${(props) => (props.$tone === "up" ? theme.colors.negative : props.$tone === "down" ? theme.colors.positive : theme.colors.text)};
    font-family: ${theme.fonts.mono};
    font-size: 13px;
    font-weight: 600;
`;

export const Subheading = styled.h3`
    margin: 4px 0;
    color: ${theme.colors.textMuted};
    font-family: ${theme.fonts.display};
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const Highlight = styled.div`
    color: ${theme.colors.text};
    font-family: ${theme.fonts.display};
    font-size: 26px;
    font-weight: 700;
`;

export const Note = styled.p`
    color: ${theme.colors.textMuted};
    font-size: 13px;
    line-height: 1.5;
`;

export const Message = styled.div`
    color: ${theme.colors.textMuted};
    font-size: 14px;
`;
