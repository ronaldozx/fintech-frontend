import styled from "styled-components";
import { theme } from "../../styles/theme";

export const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 320px;
    overflow-y: auto;
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    background: rgba(255,255,255,0.02);
    border: 1px solid ${theme.colors.border};
    border-radius: 10px;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
`;

export const Name = styled.div`
    color: ${theme.colors.text};
    font-weight: 600;
    font-size: 14px;
`;

export const Meta = styled.div`
    color: ${theme.colors.textMuted};
    font-size: 12px;
`;

export const Toolbar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
`;

export const Message = styled.div`
    color: ${theme.colors.textMuted};
    font-size: 13px;
`;

export const Success = styled.div`
    color: ${theme.colors.accent};
    font-size: 13px;
`;

export const ErrorText = styled.div`
    color: ${theme.colors.danger};
    font-size: 13px;
`;
