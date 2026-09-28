import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

export const Note = styled.p`
    color: ${theme.colors.textMuted};
    font-size: 13px;
    line-height: 1.5;
`;

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-left: 18px;
    color: ${theme.colors.text};
    font-size: 13px;
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
