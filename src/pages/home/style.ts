import styled from "styled-components";

export const Content = styled.div`
    margin-left: 64px;
    margin-top: 64px;
    padding: 24px;
    height: calc(100vh - 80px);
    box-sizing: border-box;
    gap: 24px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 8px;
    gap: 16px;
    background: rgba(255,255,255,0.02);
    border-radius: 12px;
    box-shadow: 0 0 8px rgba(79,209,197,0.05);
`;

export const ContentModules = styled.div`
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 24px;
    padding: 8px;
`;
