import styled from "styled-components";

export const Content = styled.div`
    margin-left: 64px;
    margin-top: 64px;
    padding: 24px;
    height: calc(100vh - 80px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 8px;
    gap: 16px;
    background: rgba(255,255,255,0.02);
    border-radius: 12px;
    box-shadow: 0 0 8px rgba(79,209,197,0.05);
`;

export const ContentModules = styled.div`
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: minmax(0, 1.4fr) minmax(0, 1fr);
    gap: 24px;
    padding: 8px;
`;

export const CashFlowCell = styled.div`
    grid-column: span 2;
    min-height: 0;
`;

export const CategoryCell = styled.div`
    min-height: 0;
`;

export const TransactionsCell = styled.div`
    grid-column: 1 / -1;
    min-height: 0;
`;
