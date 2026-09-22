import styled from "styled-components";
import { FIT } from "../../styles/layout";
import { theme } from "../../styles/theme";
import type { AdviceSeverity } from "../../types/Advisor";

const severityColor: Record<AdviceSeverity, string> = {
    CRITICAL: theme.colors.negative,
    WARNING: theme.colors.warning,
    INFO: theme.colors.accent,
};

export const Layout = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
    gap: 20px;

    ${FIT} {
        flex: 1 1 0;
        min-height: 0;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
`;

export const ColumnTitle = styled.h2`
    color: ${theme.colors.textMuted};
    font-family: ${theme.fonts.display};
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
`;

export const CardList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 0;
    overflow-y: auto;
`;

export const Card = styled.div<{ $severity: AdviceSeverity }>`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px 14px;
    background: rgba(255,255,255,0.02);
    border: 1px solid ${theme.colors.hairline};
    border-left: 3px solid ${(props) => severityColor[props.$severity]};
    border-radius: ${theme.radius.medium};
`;

export const CardHead = styled.div<{ $severity: AdviceSeverity }>`
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${(props) => severityColor[props.$severity]};
    font-size: 12px;
    font-weight: 600;
`;

export const CardTitle = styled.strong`
    color: ${theme.colors.text};
    font-size: 14px;
    font-weight: 600;
`;

export const CardMessage = styled.p`
    color: ${theme.colors.textMuted};
    font-size: 13px;
    line-height: 1.5;
`;

export const CardLink = styled.a`
    align-self: flex-start;
    margin-top: 2px;
    color: ${theme.colors.accent};
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const Empty = styled.div`
    color: ${theme.colors.textMuted};
    font-size: 13px;
    line-height: 1.5;
`;

export const Disclaimer = styled.p`
    color: ${theme.colors.textFaint};
    font-size: 12px;
    line-height: 1.5;
`;

export const Message = styled.div`
    color: ${theme.colors.textMuted};
    font-size: 14px;
`;
