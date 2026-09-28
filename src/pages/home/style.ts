import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Content = styled.main`
    margin-left: 72px;
    margin-top: 64px;
    height: calc(100vh - 64px);
    padding: 28px 32px 40px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow-y: auto;
    overflow-x: hidden;

    & > * {
        flex-shrink: 0;
    }

    @media (max-width: 720px) {
        margin-left: 0;
        padding: 20px 16px 32px;
    }
`;

export const PageHeader = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
`;

export const Heading = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

    h1 {
        font-family: ${theme.fonts.display};
        font-size: clamp(24px, 2.6vw, 32px);
        font-weight: 700;
        letter-spacing: -0.02em;
        color: ${theme.colors.text};
    }

    p {
        font-family: ${theme.fonts.mono};
        font-size: 12px;
        color: ${theme.colors.textMuted};
        letter-spacing: 0.04em;
    }
`;

export const Toolbar = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
`;

export const ChartsRow = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    gap: 20px;
    min-height: 380px;

    @media (max-width: 1100px) {
        grid-template-columns: 1fr;
    }
`;

export const ChartCell = styled.div`
    min-height: 360px;
    min-width: 0;
`;

export const TransactionsCell = styled.div`
    height: 460px;
    min-height: 0;
`;
