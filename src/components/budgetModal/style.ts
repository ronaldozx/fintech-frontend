import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`;

export const Hint = styled.div`
    color: ${theme.colors.textMuted};
    font-size: 13px;
`;

export const ErrorText = styled.div`
    color: ${theme.colors.danger};
    font-size: 13px;
`;
