import styled from "styled-components";
import { chartColors } from "../../../../styles/chart";

export const Bar = styled.div`
    height: 10px;
    min-width: 2px;
    background: ${chartColors.category};
    border-radius: 0 4px 4px 0;
    transition: filter 120ms ease;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 2px 0;
    border-radius: 6px;

    &:hover ${Bar}, &:focus-visible ${Bar} {
        filter: brightness(1.2);
    }

    &:focus-visible {
        outline: 2px solid rgba(79,209,197,0.4);
        outline-offset: 2px;
    }
`;

export const Rows = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    min-height: 0;
`;

export const RowHead = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    font-size: 13px;
`;

export const Name = styled.span`
    color: #F0F4F8;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const Meta = styled.span`
    color: #94A3B8;
    font-size: 12px;
    white-space: nowrap;
`;

export const BarLine = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
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
    color: #F0F4F8;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
`;

export const TableArea = styled.div`
    flex: 1;
    min-height: 0;
`;
