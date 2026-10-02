import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 48px 24px;
    text-align: center;
`;

export const IconCircle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: ${theme.colors.accentSoft};
    color: ${theme.colors.accent};
    font-size: 18px;
`;

export const Title = styled.h3`
    color: ${theme.colors.text};
    font-family: ${theme.fonts.display};
    font-size: 15px;
    font-weight: 600;
`;

export const Description = styled.p`
    max-width: 420px;
    color: ${theme.colors.textMuted};
    font-size: 13px;
    line-height: 1.5;
`;
