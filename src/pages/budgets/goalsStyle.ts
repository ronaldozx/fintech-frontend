import styled from "styled-components";
import { GROW_EASING, GROW_MS, growX } from "../../styles/motion";
import { theme } from "../../styles/theme";
import type { GoalStatus } from "../../types/Goals";

const toneColor: Record<GoalStatus, string> = {
    ACHIEVED: theme.colors.positive,
    ON_TRACK: theme.colors.accent,
    BEHIND: theme.colors.warning,
    OVERDUE: theme.colors.negative,
    OPEN: theme.colors.textMuted,
};

export const GoalTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;

    strong {
        overflow: hidden;
        color: ${theme.colors.text};
        font-size: 15px;
        font-weight: 600;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    span {
        color: ${theme.colors.textMuted};
        font-size: 12px;
        line-height: 1.35;
    }
`;

export const Amounts = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    color: ${theme.colors.textMuted};
    font-size: 12px;

    strong {
        color: ${theme.colors.text};
        font-family: ${theme.fonts.mono};
        font-size: 13px;
        font-weight: 600;
    }
`;

export const Track = styled.div`
    height: 8px;
    overflow: hidden;
    background: rgba(255,255,255,0.07);
    border-radius: 4px;
`;

export const Fill = styled.div<{ $status: GoalStatus }>`
    height: 100%;
    min-width: 2px;
    background: ${(props) => toneColor[props.$status]};
    border-radius: 4px;
    transition: width 400ms ease;
    transform-origin: left;
    animation: ${growX} ${GROW_MS}ms ${GROW_EASING} both;

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }
`;

export const StatusLine = styled.div<{ $status: GoalStatus }>`
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${(props) => toneColor[props.$status]};
    font-size: 13px;
    font-weight: 600;
`;

export const Pace = styled.div`
    color: ${theme.colors.textMuted};
    font-size: 12px;
    line-height: 1.4;
`;

export const CardFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
`;
