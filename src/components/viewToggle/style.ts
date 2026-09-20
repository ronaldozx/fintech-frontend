import styled from "styled-components";

export const ToggleButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    color: #94A3B8;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px;
    transition: background 120ms ease, color 120ms ease;

    &:hover {
        background: rgba(255,255,255,0.03);
        color: #D1EDEA;
    }

    &:focus-visible {
        outline: 2px solid rgba(79,209,197,0.4);
        outline-offset: 2px;
    }
`;
