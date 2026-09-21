import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 24px;
    box-sizing: border-box;
`;

export const Card = styled.div`
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 440px;
    max-width: 100%;
    background: linear-gradient(180deg, rgba(15,24,44,0.86) 0%, rgba(8,13,26,0.9) 100%);
    backdrop-filter: blur(16px);
    padding: 40px 36px;
    border-radius: 20px;
    border: 1px solid ${theme.colors.borderStrong};
    box-shadow:
        0 0 0 1px rgba(34,211,238,0.04),
        0 30px 80px rgba(0,0,0,0.65),
        0 0 80px rgba(34,211,238,0.07),
        inset 0 1px 0 rgba(255,255,255,0.05);
    gap: 12px;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 12%;
        right: 12%;
        height: 1px;
        background: linear-gradient(90deg, transparent, ${theme.colors.accent}, ${theme.colors.violet}, transparent);
    }

    @media (max-width: 768px) {
        padding: 28px 20px;
    }
`;

export const LogoMark = styled.div`
    width: 40px;
    height: 40px;
    background: ${theme.gradients.brand};
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: ${theme.glow.accent};
`;

export const Tag = styled.span`
    display: inline-block;
    background: ${theme.colors.accentSoft};
    color: ${theme.colors.accent};
    font-family: ${theme.fonts.mono};
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 20px;
    margin-bottom: 14px;
    border: 1px solid ${theme.colors.borderStrong};
    letter-spacing: 0.08em;
    width: fit-content;
`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 20px;

    h2 {
        margin: 0;
        font-family: ${theme.fonts.display};
        font-size: 26px;
        font-weight: 700;
        letter-spacing: -0.02em;
        background: ${theme.gradients.brandText};
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    p {
        margin: 0;
        font-size: 13px;
        color: ${theme.colors.textMuted};
    }
`;

export const Actions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 8px;
`;

export const LinkedText = styled.a`
    color: ${theme.colors.accent};
    cursor: pointer;
    font-weight: 500;
    &:hover {
        text-decoration: underline;
    }
`;

export const LinkedContainer = styled.div`
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 4px;
    color: ${theme.colors.textMuted};
    font-size: 13px;
`;

export const ButtonAuth = styled.button`
    padding: 13px 16px;
    background: ${theme.gradients.brand};
    color: #04060c;
    border-radius: ${theme.radius.medium};
    font-family: ${theme.fonts.display};
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: none;
    box-shadow: 0 8px 24px rgba(34,211,238,0.22);
    transition: transform 120ms ease, box-shadow 120ms ease, filter 120ms ease;

    &:hover {
        filter: brightness(1.08);
        box-shadow: 0 10px 30px rgba(34,211,238,0.35);
    }

    &:active {
        transform: translateY(1px) scale(0.998);
    }

    &:focus-visible {
        outline: 2px solid ${theme.colors.accent};
        outline-offset: 3px;
    }
`;
