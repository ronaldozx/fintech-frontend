import styled from "styled-components";
import { FIT } from "../../styles/layout";

export const ChartsRow = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    gap: 20px;
    min-height: 380px;

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
    }

    ${FIT} {
        flex: 1.25 1 0;
        min-height: 0;
        gap: 14px;
        grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    }
`;

export const ChartCell = styled.div`
    min-height: 360px;
    min-width: 0;

    ${FIT} {
        min-height: 0;
    }
`;

export const TransactionsCell = styled.div`
    height: 460px;
    min-height: 0;

    ${FIT} {
        flex: 1 1 0;
        height: auto;
    }
`;
