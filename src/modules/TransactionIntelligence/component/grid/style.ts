import styled from "styled-components";
import { theme } from "../../../../styles/theme";

export const TableArea = styled.div`
    flex: 1;
    min-height: 0;
`;

export const NeutralTag = styled.span`
    margin-left: 8px;
    padding: 2px 6px;
    color: ${theme.colors.textMuted};
    font-size: 11px;
    white-space: nowrap;
    border: 1px solid rgba(148,163,184,0.3);
    border-radius: 6px;
`;
