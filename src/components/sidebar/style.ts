import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { theme } from "../../styles/theme";

export const Container = styled.nav`
    position: fixed;
    top: 64px;
    left: 0;
    height: calc(100vh - 64px);
    width: 72px;
    background: rgba(6,10,20,0.7);
    backdrop-filter: blur(12px);
    border-right: 1px solid ${theme.colors.border};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 0;
    box-sizing: border-box;
    z-index: 100;

    @media (max-width: 720px) {
        display: none;
    }
`;

export const NavGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;
    width: 100%;
    padding: 0 10px;
`;

export const NavItem = styled(NavLink)`
    width: 46px;
    height: 46px;
    border-radius: ${theme.radius.medium};
    border: 1px solid transparent;
    background: transparent;
    color: ${theme.colors.textFaint};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: color 0.2s, background 0.2s, border-color 0.2s;

    &:hover {
        background: ${theme.colors.accentSoft};
        color: ${theme.colors.text};
    }

    &:focus-visible {
        outline: 2px solid ${theme.colors.accent};
        outline-offset: 2px;
    }

    &::before {
        content: '';
        position: absolute;
        left: -11px;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 0;
        background: ${theme.colors.accent};
        border-radius: 0 4px 4px 0;
        box-shadow: 0 0 10px ${theme.colors.accent};
        transition: height 0.2s;
    }

    &.active {
        border-color: ${theme.colors.borderStrong};
        background: ${theme.colors.accentSoft};
        color: ${theme.colors.accent};
        box-shadow: ${theme.glow.accent};
    }

    &.active::before {
        height: 22px;
    }
`;
