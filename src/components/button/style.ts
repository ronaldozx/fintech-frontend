import styled from "styled-components";

export const DefaultButtonStyle = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #ffffff;
    background: rgba(255,255,255,0.03);
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    border: 1px solid rgba(255,255,255,0.06);
    padding: 10px 16px;
    cursor: pointer;
    transition: transform 150ms cubic-bezier(.2,.9,.3,1), box-shadow 150ms ease, filter 150ms ease, opacity 150ms ease;
    box-shadow: 0 6px 18px rgba(45,155,145,0.08);

    &:hover {
        transform: translateY(-2px);
        filter: brightness(1.04);
        box-shadow: 0 10px 24px rgba(45,155,145,0.12);
    }

    &:active {
        transform: translateY(0) scale(0.995);
        box-shadow: 0 6px 14px rgba(45,155,145,0.08);
    }

    &:focus-visible {
        outline: 3px solid rgba(79,209,197,0.18);
        outline-offset: 2px;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
        filter: none;
    }
`;