import styled from "styled-components";
import { FIT } from "../../../../styles/layout";
import { theme } from "../../../../styles/theme";
import { chartColors } from "../../../../styles/chart";

export const Bar = styled.div`
    height: 10px;
    min-width: 2px;
    background: ${chartColors.category};
    border-radius: 0 4px 4px 0;
    transition: filter 120ms ease;
`;

export const COMPACT_ROW_HEIGHT = 22;
export const COMPACT_ROW_GAP = 6;

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 2px 0;
    border-radius: 6px;

    ${FIT} {
        flex-direction: row;
        align-items: center;
        gap: 10px;
        height: ${COMPACT_ROW_HEIGHT}px;
        padding: 0;
    }

    &:hover ${Bar}, &:focus-visible ${Bar} {
        filter: brightness(1.2);
    }

    &:focus-visible {
        outline: 2px solid ${theme.colors.accent};
        outline-offset: 2px;
    }
`;

export const Rows = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    min-height: 0;

    ${FIT} {
        flex: 1;
        gap: ${COMPACT_ROW_GAP}px;
        overflow: hidden;
    }
`;

export const RowHead = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    font-size: 13px;

    ${FIT} {
        flex: 0 0 30%;
        min-width: 0;
    }
`;

export const Name = styled.span`
    color: ${theme.colors.text};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const Meta = styled.span`
    color: ${theme.colors.textMuted};
    font-size: 12px;
    white-space: nowrap;

    ${FIT} {
        display: none;
    }
`;

export const BarLine = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    ${FIT} {
        flex: 1;
        min-width: 0;
    }
`;

export const Track = styled.div`
    flex: 1;
    min-width: 0;
    padding: 2px 0;
    border-left: 1px solid ${chartColors.axis};
`;

export const Value = styled.span`
    min-width: 64px;
    text-align: right;
    color: ${theme.colors.text};
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
`;

export const TableArea = styled.div`
    flex: 1;
    min-height: 0;
`;
