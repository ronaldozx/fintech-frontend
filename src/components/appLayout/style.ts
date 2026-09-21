import styled from "styled-components";

export const Main = styled.main`
    margin-left: 72px;
    margin-top: 64px;
    height: calc(100vh - 64px);
    padding: 28px 32px 40px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow-y: auto;
    overflow-x: hidden;

    & > * {
        flex-shrink: 0;
    }

    @media (max-width: 720px) {
        margin-left: 0;
        padding: 20px 16px 32px;
    }
`;
