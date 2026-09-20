import styled from "styled-components";

export const Options = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const Option = styled.button<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    color: ${(props) => (props.$selected ? "#F0F4F8" : "#94A3B8")};
    font-size: 14px;
    font-weight: ${(props) => (props.$selected ? 600 : 400)};
    text-align: left;
    background: transparent;
    border-radius: 8px;
    transition: background 120ms ease, color 120ms ease;

    &:hover {
        background: rgba(255,255,255,0.03);
        color: #F0F4F8;
    }

    &:focus-visible {
        outline: 2px solid rgba(79,209,197,0.4);
        outline-offset: 2px;
    }
`;

export const Check = styled.span`
    width: 16px;
    color: #4FD1C5;
`;
