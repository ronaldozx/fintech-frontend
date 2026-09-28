import styled, { keyframes } from "styled-components";
import { theme } from "../../styles/theme";
import type { NotificationSeverity } from "../../types/Notifications";

const pop = keyframes`
    from { transform: translateY(-6px) scale(0.98); opacity: 0; }
    to { transform: translateY(0) scale(1); opacity: 1; }
`;

const pulse = keyframes`
    0%, 100% { box-shadow: 0 0 0 0 rgba(251,113,133,0.55); }
    50% { box-shadow: 0 0 0 6px rgba(251,113,133,0); }
`;

const severityColor: Record<NotificationSeverity, string> = {
    INFO: theme.colors.accent,
    WARNING: theme.colors.warning,
    CRITICAL: theme.colors.negative,
};

export const Wrapper = styled.div`
    position: relative;
`;

export const Trigger = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    color: ${theme.colors.textMuted};
    background: rgba(255,255,255,0.03);
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radius.medium};
    cursor: pointer;
    transition: all 0.2s;

    &:hover,
    &[aria-expanded="true"] {
        color: ${theme.colors.text};
        border-color: ${theme.colors.borderStrong};
        box-shadow: ${theme.glow.accent};
    }

    &:focus-visible {
        outline: 2px solid ${theme.colors.accent};
        outline-offset: 2px;
    }
`;

export const Count = styled.span<{ $critical: boolean }>`
    position: absolute;
    top: -5px;
    right: -5px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    color: #050810;
    font-family: ${theme.fonts.display};
    font-size: 11px;
    font-weight: 700;
    line-height: 18px;
    text-align: center;
    background: ${(props) => (props.$critical ? theme.colors.negative : theme.colors.accent)};
    border: 1.5px solid #050810;
    border-radius: 9px;
    animation: ${(props) => (props.$critical ? pulse : "none")} 2s ease-in-out infinite;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

export const Panel = styled.div`
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    z-index: 1300;
    display: flex;
    flex-direction: column;
    width: min(400px, calc(100vw - 24px));
    max-height: min(70vh, 540px);
    background: linear-gradient(180deg, rgba(15,24,44,0.98) 0%, rgba(8,13,26,0.99) 100%);
    border: 1px solid ${theme.colors.borderStrong};
    border-radius: ${theme.radius.large};
    box-shadow: 0 30px 80px rgba(0,0,0,0.7), ${theme.glow.soft};
    animation: ${pop} 180ms cubic-bezier(.2,.9,.3,1) both;
    overflow: hidden;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

export const PanelHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    border-bottom: 1px solid ${theme.colors.hairline};

    strong {
        color: ${theme.colors.text};
        font-family: ${theme.fonts.display};
        font-size: 13px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
    }
`;

export const TextButton = styled.button`
    color: ${theme.colors.accent};
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;

    &:hover:not(:disabled) {
        text-decoration: underline;
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    &:focus-visible {
        outline: 2px solid ${theme.colors.accent};
        outline-offset: 2px;
    }
`;

export const List = styled.ul`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    list-style: none;
`;

export const Item = styled.li<{ $severity: NotificationSeverity; $read: boolean }>`
    border-bottom: 1px solid ${theme.colors.hairline};

    button {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        width: 100%;
        padding: 12px 16px;
        color: ${theme.colors.text};
        text-align: left;
        background: ${(props) => (props.$read ? "transparent" : "rgba(34,211,238,0.04)")};
        cursor: pointer;
        transition: background 120ms ease;

        &:hover {
            background: ${theme.colors.accentSoft};
        }

        &:focus-visible {
            outline: 2px solid ${theme.colors.accent};
            outline-offset: -2px;
        }
    }

    svg {
        flex-shrink: 0;
        margin-top: 2px;
        color: ${(props) => severityColor[props.$severity]};
    }
`;

export const ItemBody = styled.div<{ $read: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;

    strong {
        color: ${(props) => (props.$read ? theme.colors.textMuted : theme.colors.text)};
        font-size: 13px;
        font-weight: 600;
    }

    span {
        color: ${theme.colors.textMuted};
        font-size: 12px;
        line-height: 1.4;
    }

    small {
        color: ${theme.colors.textFaint};
        font-size: 11px;
    }
`;

export const Empty = styled.div`
    padding: 28px 16px;
    color: ${theme.colors.textMuted};
    font-size: 13px;
    text-align: center;
`;
