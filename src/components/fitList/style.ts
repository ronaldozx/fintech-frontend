import styled from "styled-components";
import { FIT } from "../../styles/layout";
import { theme } from "../../styles/theme";

export const ListBox = styled.ul<{ $gap: number }>`
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style: none;

    ${FIT} {
        flex: 1;
        min-height: 0;
        gap: ${(props) => props.$gap}px;
        overflow: hidden;
    }
`;

export const More = styled.li<{ $height: number }>`
    flex-shrink: 0;
    height: ${(props) => props.$height}px;
    color: ${theme.colors.textMuted};
    font-size: 11px;
    line-height: ${(props) => props.$height}px;
    text-align: center;
`;
