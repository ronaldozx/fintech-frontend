import styled from "styled-components";
import { theme } from "./theme";

export const chartColors = {
    income: "#3987e5",
    expense: "#d95926",
    category: "#3987e5",
    grid: "rgba(255,255,255,0.06)",
    axis: "rgba(255,255,255,0.16)",
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
