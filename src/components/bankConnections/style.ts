import styled from "styled-components";

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
    border: 1px solid rgba(79,209,197,0.08);
    border-radius: 10px;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
`;

export const Name = styled.div`
    color: #F0F4F8;
    font-weight: 600;
    font-size: 14px;
`;

export const Meta = styled.div`
    color: #94A3B8;
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
    color: #94A3B8;
    font-size: 13px;
`;

export const Success = styled.div`
    color: #4FD1C5;
    font-size: 13px;
`;

export const ErrorText = styled.div`
    color: #F87171;
    font-size: 13px;
`;
