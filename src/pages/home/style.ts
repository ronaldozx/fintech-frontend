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

export const FormRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 6px;
`;

export const FileLabel = styled.label`
    color: #94A3B8;
    font-size: 13px;
`;

export const FileInput = styled.input`
    display: none;
`;

export const FileButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255,255,255,0.02);
    color: #fff;
    border: 1px solid rgba(79,209,197,0.08);
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: transform 120ms ease, box-shadow 120ms ease;

    &:hover { transform: translateY(-2px); }
    &:active { transform: translateY(0); }
`;

export const FileName = styled.div`
    color: #4FD1C5;
    font-size: 13px;
`;

export const CancelButton = styled.button`
    background: transparent;
    border: none;
    color: #94A3B8;
    padding: 8px;
    cursor: pointer;
    border-radius: 8px;
    transition: background 120ms ease, color 120ms ease;

    &:hover {
        background: rgba(255,255,255,0.02);
        color: #D1EDEA;
    }
`;

export const ErrorText = styled.div`
    color: #F87171;
    font-size: 13px;
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