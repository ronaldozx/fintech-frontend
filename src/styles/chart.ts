import styled from "styled-components";
import { theme } from "./theme";

export const chartColors = {
    income: "#4F7C82",
    expense: "#D6D9DE",
    category: "#4F7C82",
    grid: "rgba(148,163,184,0.08)",
    axis: "rgba(148,163,184,0.18)",
    textPrimary: theme.colors.text,
    textSecondary: theme.colors.textMuted,
};

export const ChartMessage = styled.div`
    color: ${theme.colors.textMuted};
    font-size: 13px;
`;

export const ChartError = styled.div`
    color: ${theme.colors.danger};
    font-size: 13px;
`;

export const ChartBody = styled.div<{ $stale: boolean }>`
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    opacity: ${(props) => (props.$stale ? 0.55 : 1)};
    transition: opacity 150ms ease;
`;
