import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const Note = styled.p`
    color: ${theme.colors.textMuted};
    font-size: 13px;
    line-height: 1.5;
`;

export const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;

export const ErrorText = styled.div`
    color: ${theme.colors.danger};
    font-size: 13px;
`;
