import styled from "styled-components";

export const chartColors = {
    income: "#3987e5",
    expense: "#d95926",
    category: "#3987e5",
    grid: "rgba(255,255,255,0.06)",
    axis: "rgba(255,255,255,0.16)",
    textPrimary: "#F0F4F8",
    textSecondary: "#94A3B8",
};

export const ChartMessage = styled.div`
    color: #94A3B8;
    font-size: 13px;
`;

export const ChartError = styled.div`
    color: #F87171;
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
