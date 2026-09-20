// navbar/style.ts
import styled from "styled-components";

export const Container = styled.div`
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
    background: rgba(5,8,16,0.95);
    border-bottom: 1px solid rgba(79,209,197,0.08);
    z-index: 1000;
    

    &::after {
        content: '';
        position: absolute;
        bottom: 0; left: 10%; right: 10%;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(79,209,197,0.3), transparent);
        pointer-events: none;
    }
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const LogoMark = styled.div`
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, #4FD1C5, #2D9B91);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 14px rgba(79,209,197,0.25);
`;

export const LogoText = styled.h1`
    font-size: 16px;
    font-weight: 600;
    color: #F0F4F8;
    letter-spacing: -0.3px;
    margin: 0;

    span {
        color: #4FD1C5;
    }
`;

export const ContainerRight = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

export const IconButton = styled.button`
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.03);
    color: #475569;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;

    &:hover {
        border-color: rgba(79,209,197,0.2);
        color: #94A3B8;
    }
`;

export const Badge = styled.div`
    position: absolute;
    top: 6px;
    right: 6px;
    width: 7px;
    height: 7px;
    background: #4FD1C5;
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(79,209,197,0.6);
    border: 1.5px solid #050810;
`;

export const DividerV = styled.div`
    width: 1px;
    height: 24px;
    background: rgba(255,255,255,0.06);
    margin: 0 4px;
`;

export const UserMenu = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 10px 4px 4px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.03);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: rgba(79,209,197,0.15);
    }
`;

export const Avatar = styled.div`
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: linear-gradient(135deg, rgba(79,209,197,0.3), rgba(45,155,145,0.3));
    border: 1px solid rgba(79,209,197,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 500;
    color: #4FD1C5;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const UserName = styled.span`
    font-size: 12px;
    font-weight: 500;
    color: #CBD5E1;
    line-height: 1;
`;

export const UserEmail = styled.span`
    font-size: 10px;
    color: #94A3B8;
    line-height: 1;
`;

export const UserRole = styled.span`
    font-size: 10px;
    color: #475569;
    line-height: 1;
`;

export const UserSideBar = styled.div`
    position: fixed;
    top: 10px;
    right: 16px;
    width: 300px;
    background: rgba(5,8,16,0.95);
    border: 1px solid rgba(79,209,197,0.08);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(79,209,197,0.1);
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

    &::before {
        content: '';
        position: absolute;
        top: -6px;
        right: 28px;
        width: 12px;
        height: 12px;
        background: rgba(5,8,16,0.95);
        border: 1px solid rgba(79,209,197,0.08);
        transform: rotate(45deg);
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    gap: 10px;
    padding: 8px;
`;

export const UserContent = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    border-radius: 8px;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 12px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.03);
`;

export const LinkedText = styled.span`
    color: #ffffffad;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.2s;
    padding-top: 8px;
    gap: 10px;
    display: flex;

    &:hover {
        color: #2D9B91;
    }
    &:first-child {
        border-top: 1px solid rgba(255,255,255,0.06);
        border-bottom: 1px solid rgba(255,255,255,0.06);
    }
`;