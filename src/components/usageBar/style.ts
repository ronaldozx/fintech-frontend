import styled from "styled-components";
import { theme } from "../../styles/theme";
import type { UsageTone } from "../../types/Accounts";

const toneColor: Record<UsageTone, string> = {
    normal: theme.colors.accent,
    warning: theme.colors.warning,
    critical: theme.colors.negative,
};

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const Head = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
    color: ${theme.colors.textMuted};
`;

export const Status = styled.span<{ $tone: UsageTone }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: ${(props) => (props.$tone === "normal" ? theme.colors.textMuted : toneColor[props.$tone])};
    font-weight: 600;
    white-space: nowrap;
`;

export const Track = styled.div`
    height: 8px;
    overflow: hidden;
    background: rgba(255,255,255,0.07);
    border-radius: 4px;
`;

export const Fill = styled.div<{ $tone: UsageTone }>`
    height: 100%;
    min-width: 2px;
    background: ${(props) => toneColor[props.$tone]};
    border-radius: 4px;
    transition: width 200ms ease;
`;
