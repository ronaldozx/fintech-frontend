import styled from "styled-components";

export const Kpis = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
`;

export const Kpi = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
`;

export const KpiLabel = styled.div`
    color: #94A3B8;
    font-size: 12px;
`;

export const KpiValue = styled.div`
    color: #F0F4F8;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const TableArea = styled.div`
    flex: 1;
    min-height: 0;
`;
