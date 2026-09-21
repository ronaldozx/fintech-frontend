import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    height: 64px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 24px;
    box-sizing: border-box;
    background: rgba(5,8,16,0.72);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid ${theme.colors.border};
    z-index: 1000;

    &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent 0%, ${theme.colors.accent} 30%, ${theme.colors.violet} 70%, transparent 100%);
        opacity: 0.55;
        pointer-events: none;
    }
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const LogoMark = styled.div`
    width: 32px;
    height: 32px;
    background: ${theme.gradients.brand};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${theme.glow.accent};
`;

export const LogoText = styled.h1`
    font-family: ${theme.fonts.display};
    font-size: 18px;
    font-weight: 700;
    color: ${theme.colors.text};
    letter-spacing: -0.02em;
    margin: 0;

    span {
        color: ${theme.colors.accent};
    }
`;

export const ContainerRight = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

export const IconButton = styled.button`
    width: 38px;
    height: 38px;
    border-radius: ${theme.radius.medium};
    border: 1px solid ${theme.colors.border};
    background: rgba(255,255,255,0.03);
    color: ${theme.colors.textMuted};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;

    &:hover {
        border-color: ${theme.colors.borderStrong};
        color: ${theme.colors.text};
    }
`;

export const Badge = styled.div`
    position: absolute;
    top: 7px;
    right: 7px;
    width: 7px;
    height: 7px;
    background: ${theme.colors.accent};
    border-radius: 50%;
    box-shadow: 0 0 8px ${theme.colors.accent};
    border: 1.5px solid #050810;
`;

export const DividerV = styled.div`
    width: 1px;
    height: 24px;
    background: ${theme.colors.hairline};
    margin: 0 4px;
`;

export const UserMenu = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 12px 4px 4px;
    border-radius: ${theme.radius.medium};
    border: 1px solid ${theme.colors.border};
    background: rgba(255,255,255,0.03);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: ${theme.colors.borderStrong};
    }

    &:focus-visible {
        outline: 2px solid ${theme.colors.accent};
        outline-offset: 2px;
    }
`;

export const Avatar = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 9px;
    background: ${theme.gradients.brand};
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${theme.fonts.display};
    font-size: 11px;
    font-weight: 700;
    color: #04060c;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    text-align: left;
`;

export const UserName = styled.span`
    font-size: 12px;
    font-weight: 600;
    color: ${theme.colors.text};
    line-height: 1;
`;

export const UserEmail = styled.span`
    font-size: 11px;
    color: ${theme.colors.textMuted};
    line-height: 1;
`;

export const UserRole = styled.span`
    font-family: ${theme.fonts.mono};
    font-size: 10px;
    color: ${theme.colors.accent};
    line-height: 1;
    letter-spacing: 0.06em;
`;

export const UserSideBar = styled.div`
    position: fixed;
    top: 12px;
    right: 16px;
    width: 300px;
    background: linear-gradient(180deg, rgba(15,24,44,0.97) 0%, rgba(8,13,26,0.98) 100%);
    border: 1px solid ${theme.colors.borderStrong};
    border-radius: ${theme.radius.medium};
    box-shadow: 0 24px 60px rgba(0,0,0,0.6);
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 1100;
    transform-origin: top right;
    animation: dropdown 180ms cubic-bezier(.22,.9,.45,1) both;

    @keyframes dropdown {
        from {
            transform: translateY(-8px) scale(0.98);
            opacity: 0;
        }
        to {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: ${theme.radius.small};
    gap: 10px;
    padding: 8px;
`;

export const UserContent = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    border-radius: ${theme.radius.small};
    align-items: center;
    gap: 12px;
    padding: 12px;
    border: 1px solid ${theme.colors.hairline};
    background: rgba(255,255,255,0.03);
`;

export const LinkedText = styled.span`
    color: ${theme.colors.textMuted};
    cursor: pointer;
    font-size: 13px;
    transition: color 0.2s;
    padding-top: 8px;
    gap: 10px;
    display: flex;
    align-items: center;

    &:hover {
        color: ${theme.colors.accent};
    }
    &:first-child {
        border-top: 1px solid ${theme.colors.hairline};
        border-bottom: 1px solid ${theme.colors.hairline};
        padding-bottom: 8px;
    }
`;
