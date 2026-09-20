import styled from "styled-components";

export const Frame = styled.div`
    position: relative;
    flex: 1;
    min-height: 120px;
    width: 100%;
`;

export const Legend = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    color: #94A3B8;
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
        stroke: rgba(79,209,197,0.6);
        stroke-width: 1;
    }
`;

export const BarGroup = styled.g<{ $active: boolean }>`
    filter: ${(props) => (props.$active ? "brightness(1.2)" : "none")};
    transition: filter 120ms ease;
`;

export const Tooltip = styled.div`
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    min-width: 132px;
    padding: 8px 10px;
    background: rgba(5,8,16,0.96);
    border: 1px solid rgba(79,209,197,0.16);
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(2,6,10,0.6);
    pointer-events: none;
    z-index: 2;
`;

export const TooltipTitle = styled.div`
    color: #94A3B8;
    font-size: 12px;
    margin-bottom: 4px;
`;

export const TooltipRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 12px;
    color: #94A3B8;
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
    color: #F0F4F8;
    font-weight: 600;
`;
