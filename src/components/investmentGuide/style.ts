import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Terms = styled.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    max-height: min(60vh, 460px);
    padding-right: 6px;
    overflow-y: auto;
`;

export const Term = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
        color: ${theme.colors.text};
        font-size: 14px;
    }

    p {
        color: ${theme.colors.textMuted};
        font-size: 13px;
        line-height: 1.5;
    }
`;

export const Disclaimer = styled.p`
    margin-top: 14px;
    padding-top: 12px;
    color: ${theme.colors.textFaint};
    font-size: 12px;
    line-height: 1.5;
    border-top: 1px solid ${theme.colors.hairline};
`;
