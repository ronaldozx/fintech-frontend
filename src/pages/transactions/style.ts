import styled from "styled-components";
import { FIT } from "../../styles/layout";
import { theme } from "../../styles/theme";

export const FiltersPanel = styled.section`
    display: grid;
    grid-template-columns: minmax(0, 2fr) repeat(4, minmax(0, 1fr));
    gap: 14px;
    align-items: end;
    padding: 18px;
    background: linear-gradient(180deg, rgba(15,24,44,0.78) 0%, ${theme.colors.panel} 100%);
    backdrop-filter: blur(14px);
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radius.large};

    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }

    ${FIT} {
        grid-template-columns: minmax(0, 2fr) repeat(4, minmax(0, 1fr));
        gap: 12px;
        padding: 10px 14px;
    }
`;

export const SearchField = styled.div`
    min-width: 0;

    @media (max-width: 1200px) {
        grid-column: 1 / -1;
    }

    ${FIT} {
        grid-column: auto;
    }
`;

export const TotalsRow = styled.div<{ $stale: boolean }>`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    opacity: ${(props) => (props.$stale ? 0.55 : 1)};
    transition: opacity 150ms ease;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }

    ${FIT} {
        gap: 14px;
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
`;

export const ResultsCell = styled.div`
    height: 680px;
    min-height: 0;

    ${FIT} {
        flex: 1 1 0;
        height: auto;
    }
`;

export const TableArea = styled.div<{ $stale: boolean }>`
    flex: 1;
    min-height: 0;
    opacity: ${(props) => (props.$stale ? 0.55 : 1)};
    transition: opacity 150ms ease;
`;

export const Muted = styled.span`
    color: ${theme.colors.textMuted};
`;
