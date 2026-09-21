import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const TableArea = styled.div`
    flex: 1;
    min-height: 0;
`;

export const SeeAll = styled.a`
    color: ${theme.colors.accent};
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }

    &:focus-visible {
        outline: 2px solid ${theme.colors.accent};
        outline-offset: 2px;
    }
`;
