import styled from "styled-components";
import { FIT } from "../../styles/layout";
import { theme } from "../../styles/theme";

export const Header = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
`;

export const Heading = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

    h1 {
        font-family: ${theme.fonts.display};
        font-size: clamp(22px, 2.6vw, 32px);

        ${FIT} {
            font-size: clamp(20px, 3.4vh, 30px);
        }
        font-weight: 700;
        letter-spacing: -0.02em;
        color: ${theme.colors.text};
    }

    p {
        font-family: ${theme.fonts.mono};
        font-size: 12px;
        color: ${theme.colors.textMuted};
        letter-spacing: 0.04em;
    }
`;

export const Toolbar = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
`;
