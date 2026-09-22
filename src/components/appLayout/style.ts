import styled from "styled-components";
import { FIT } from "../../styles/layout";
import { riseIn } from "../../styles/motion";

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
        animation: ${riseIn} 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }

    & > *:nth-child(2) { animation-delay: 60ms; }
    & > *:nth-child(3) { animation-delay: 120ms; }
    & > *:nth-child(4) { animation-delay: 180ms; }
    & > *:nth-child(n + 5) { animation-delay: 240ms; }

    ${FIT} {
        padding: 16px 24px 20px;
        gap: 14px;
        overflow: hidden;
    }

    @media (max-width: 720px) {
        margin-left: 0;
        padding: 20px 16px 32px;
    }
`;
