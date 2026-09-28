import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Tile = styled.div<{ $hero: boolean; $accent?: string }>`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    min-width: 0;
    padding: ${(props) => (props.$hero ? "22px 26px" : "18px 22px")};
    background: linear-gradient(180deg, rgba(15,24,44,0.78) 0%, ${theme.colors.panel} 100%);
    backdrop-filter: blur(14px);
    border: 1px solid ${(props) => (props.$hero ? theme.colors.borderStrong : theme.colors.border)};
    border-radius: ${theme.radius.large};
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 40px rgba(0,0,0,0.35)${(props) => (props.$hero ? `, ${theme.glow.accent}` : "")};
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 3px;
        background: ${(props) => props.$accent ?? theme.gradients.brand};
    }
`;

export const Label = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${theme.colors.textMuted};
    font-family: ${theme.fonts.display};
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
`;

export const Value = styled.div<{ $hero: boolean }>`
    color: ${theme.colors.text};
    font-family: ${theme.fonts.display};
    font-size: ${(props) => (props.$hero ? "clamp(34px, 4.2vw, 54px)" : "clamp(22px, 2.4vw, 30px)")};
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${(props) => props.$hero && `
        background: ${theme.gradients.brandText};
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    `}
`;

export const Hint = styled.div`
    color: ${theme.colors.textMuted};
    font-size: 12px;
`;
