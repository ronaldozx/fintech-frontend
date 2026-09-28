import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

export const Fields = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;

    @media (max-width: 560px) {
        grid-template-columns: 1fr;
    }
`;

export const Note = styled.p`
    color: ${theme.colors.textMuted};
    font-size: 13px;
    line-height: 1.5;
`;

export const CheckRow = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${theme.colors.text};
    font-size: 14px;
    cursor: pointer;

    input {
        width: 16px;
        height: 16px;
        accent-color: ${theme.colors.accent};
    }
`;

export const Actions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const Spacer = styled.div`
    flex: 1;
`;

export const ErrorText = styled.div`
    color: ${theme.colors.danger};
    font-size: 13px;
`;
