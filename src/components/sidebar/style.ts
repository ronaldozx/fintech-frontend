import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: 64px;
    left: 0;
    height: calc(100vh - 64px);
    width: 64px;
    background: rgba(255,255,255,0.02);
    border-right: 1px solid rgba(79,209,197,0.08);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    box-sizing: border-box;
    z-index: 100;

    &::before {
        content: '';
        position: absolute;
        top: 0; bottom: 0; right: 0;
        width: 1px;
        background: linear-gradient(180deg, transparent, rgba(79,209,197,0.3), rgba(79,209,197,0.1), transparent);
        pointer-events: none;
    }
`;

export const NavGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    width: 100%;
    padding: 0 8px;
`;

export const NavButton = styled.button<{ $active?: boolean }>`
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: none;
    background: ${({ $active }) => $active ? "rgba(79,209,197,0.12)" : "transparent"};
    color: ${({ $active }) => $active ? "#4FD1C5" : "#475569"};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
    box-shadow: ${({ $active }) => $active ? "0 0 16px rgba(79,209,197,0.1)" : "none"};

    &:hover {
        background: rgba(79,209,197,0.08);
        color: #94A3B8;
    }

    &::before {
        content: '';
        position: absolute;
        left: -8px;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: ${({ $active }) => $active ? "20px" : "0px"};
        background: #4FD1C5;
        border-radius: 0 4px 4px 0;
        box-shadow: 0 0 8px rgba(79,209,197,0.5);
        transition: height 0.2s;
    }
`;

export const Divider = styled.div`
    width: 32px;
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 8px 0;
`;