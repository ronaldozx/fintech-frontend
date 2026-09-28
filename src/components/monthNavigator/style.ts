import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Wrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
`;

export const Label = styled.span`
    min-width: 150px;
    color: ${theme.colors.text};
    font-family: ${theme.fonts.display};
    font-size: 14px;
    font-weight: 600;
    text-align: center;
`;
