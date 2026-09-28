import styled from "styled-components";
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
    justify-content: space-between;
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

export const NavButton = styled.button<{ $active?: boolean }>`
    width: 46px;
    height: 46px;
    border-radius: ${theme.radius.medium};
    border: 1px solid ${({ $active }) => ($active ? theme.colors.borderStrong : "transparent")};
    background: ${({ $active }) => ($active ? theme.colors.accentSoft : "transparent")};
    color: ${({ $active }) => ($active ? theme.colors.accent : theme.colors.textFaint)};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: color 0.2s, background 0.2s, border-color 0.2s;
    box-shadow: ${({ $active }) => ($active ? theme.glow.accent : "none")};

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
        height: ${({ $active }) => ($active ? "22px" : "0px")};
        background: ${theme.colors.accent};
        border-radius: 0 4px 4px 0;
        box-shadow: 0 0 10px ${theme.colors.accent};
        transition: height 0.2s;
    }
`;

export const Divider = styled.div`
    width: 30px;
    height: 1px;
    background: ${theme.colors.hairline};
    margin: 8px 0;
`;
