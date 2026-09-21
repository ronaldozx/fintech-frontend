import styled from "styled-components";
import { FIT } from "../../styles/layout";

export const Fill = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    ${FIT} {
        && {
            flex: 1 1 0;
        }

        min-height: 0;
        gap: 14px;
    }
`;
