import styled from "styled-components";
import { FIT } from "../../styles/layout";
import { theme } from "../../styles/theme";

export const Container = styled.section<{ $fit: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    height: ${(props) => (props.$fit ? "auto" : "100%")};
    min-height: 0;
    padding: 18px;
    background: linear-gradient(180deg, rgba(15,24,44,0.78) 0%, ${theme.colors.panel} 100%);
    backdrop-filter: blur(14px);
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radius.large};
    box-shadow:
        inset 0 1px 0 rgba(255,255,255,0.04),
        0 24px 48px rgba(0,0,0,0.4),
        ${theme.glow.soft};
    overflow: hidden;

    ${FIT} {
        gap: 8px;
        padding: 12px 14px;
    }

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 14px;
        height: 14px;
        border-color: ${theme.colors.accent};
        border-style: solid;
        opacity: 0.55;
        pointer-events: none;
    }

    &::before {
        top: 8px;
        left: 8px;
        border-width: 1px 0 0 1px;
        border-top-left-radius: 6px;
    }

    &::after {
        right: 8px;
        bottom: 8px;
        border-width: 0 1px 1px 0;
        border-bottom-right-radius: 6px;
    }
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`;

export const Title = styled.h2`
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${theme.colors.text};
    font-family: ${theme.fonts.display};
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;

    &::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${theme.colors.accent};
        box-shadow: 0 0 10px ${theme.colors.accent};
    }
`;

export const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const Body = styled.div`
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow-x: hidden;
    overflow-y: auto;
`;
