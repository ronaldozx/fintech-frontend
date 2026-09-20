import styled from "styled-components";

export const Container = styled.section`
    background: rgba(255,255,255,0.02);
    border-radius: 12px;
    width: 100%;
    height: 100%;
    min-height: 0;
    box-shadow: 0 0 8px rgba(79,209,197,0.05);
    border: 1px solid rgba(79,209,197,0.08);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    color: #F0F4F8;
    font-size: 16px;
    font-weight: 600;
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
`;
