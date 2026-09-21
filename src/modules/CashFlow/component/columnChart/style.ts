import styled from "styled-components";
import { FIT } from "../../../../styles/layout";
import { theme } from "../../../../styles/theme";

export const Frame = styled.div`
    position: relative;
    flex: 1;
    min-height: 240px;
    width: 100%;

    ${FIT} {
        min-height: 0;
    }
`;

export const Svg = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    display: block;
`;

export const Legend = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    color: ${theme.colors.textMuted};
    font-size: 12px;
`;

export const LegendItem = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
`;

export const Swatch = styled.span<{ $color: string }>`
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: ${(props) => props.$color};
`;

export const HitArea = styled.rect`
    fill: transparent;
    cursor: default;

    &:focus {
        outline: none;
    }

    &:focus-visible {
        stroke: ${theme.colors.accent};
        stroke-width: 1;
    }
`;

export const BarGroup = styled.g<{ $active: boolean }>`
    filter: ${(props) => (props.$active ? "brightness(1.25) drop-shadow(0 0 6px rgba(34,211,238,0.35))" : "none")};
    transition: filter 120ms ease;
`;

export const Tooltip = styled.div`
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    min-width: 132px;
    padding: 8px 10px;
    background: rgba(5,8,16,0.96);
    border: 1px solid ${theme.colors.borderStrong};
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(2,6,10,0.6);
    pointer-events: none;
    z-index: 2;
`;

export const TooltipTitle = styled.div`
    color: ${theme.colors.textMuted};
    font-size: 12px;
    margin-bottom: 4px;
`;

export const TooltipRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 12px;
    color: ${theme.colors.textMuted};
`;

export const TooltipKey = styled.span<{ $color: string }>`
    display: inline-block;
    width: 10px;
    height: 2px;
    margin-right: 6px;
    vertical-align: middle;
    background: ${(props) => props.$color};
`;

export const TooltipValue = styled.span`
    color: ${theme.colors.text};
    font-weight: 600;
`;
