import styled from "styled-components";

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
    width: 420px;
    max-width: 100%;
    background-color: #050810c5;
    padding: 40px 36px;
    border-radius: 20px;
    border: 1px solid rgba(79, 209, 196, 0.1);
    box-shadow:
        0 0 0 1px rgba(79,209,197,0.05),
        0 20px 60px rgba(0,0,0,0.6),
        inset 0 1px 0 rgba(255,255,255,0.05);
    gap: 10px;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0; left: 20%; right: 20%;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(79,209,197,0.5), transparent);
    }

    @media (max-width: 768px) {
        padding: 28px 20px;
    }
`;

export const LogoMark = styled.div`
    width: 38px;
    height: 38px;
    background: linear-gradient(135deg, #4FD1C5, #2D9B91);
    border-radius: 10px;
    margin-bottom: 20px;
`;

export const Tag = styled.span`
    display: inline-block;
    background: rgba(79,209,197,0.1);
    color: #4FD1C5;
    font-size: 11px;
    padding: 3px 10px;
    border-radius: 20px;
    margin-bottom: 14px;
    border: 1px solid rgba(79,209,197,0.2);
    letter-spacing: 0.5px;
    width: fit-content;
`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 24px;


    h2 {
        margin: 0;
        font-size: 22px;
        font-weight: 700;
        color: #F0F4F8;
        letter-spacing: -0.3px;
    }

    p {
        margin: 0;
        font-size: 13px;
        color: #64748B;
    }
`;

export const Actions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-top: 8px;
`;

export const LinkedText = styled.a`
    color: #4FD1C5;
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
    color: #475569;
    font-size: 13px;
`;

export const ButtonAuth = styled.button`
    padding: 12px 16px;
    background: linear-gradient(90deg, #4FD1C5 0%, #2BC0A9 100%);
    color: #071023;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    border: none;
    box-shadow: 0 6px 18px rgba(79,209,197,0.16);
    transition: transform 120ms ease, box-shadow 120ms ease, filter 120ms ease;
    &:active {
        transform: translateY(1px) scale(0.998);
    }
    &:hover {
        filter: brightness(1.03);
    }
`;