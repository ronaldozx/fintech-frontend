import { keyframes } from "styled-components";

export const riseIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: none;
    }
`;

export const growX = keyframes`
    from {
        transform: scaleX(0);
    }
    to {
        transform: scaleX(1);
    }
`;

export const sheen = keyframes`
    0%, 62% {
        transform: translateX(-130%);
    }
    100% {
        transform: translateX(130%);
    }
`;

export const GROW_MS = 700;
export const GROW_EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)";
