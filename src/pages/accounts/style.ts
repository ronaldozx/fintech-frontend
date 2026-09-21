import styled from "styled-components";
import { FIT } from "../../styles/layout";
import { theme } from "../../styles/theme";

export const Stats = styled.div<{ $stale: boolean }>`
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) repeat(2, minmax(0, 1fr));
    gap: 20px;
    opacity: ${(props) => (props.$stale ? 0.55 : 1)};
    transition: opacity 150ms ease;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export const AlertList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style: none;

    ${FIT} {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
        gap: 6px 24px;
    }
`;

export const AlertItem = styled.li`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: ${theme.colors.text};
    font-size: 14px;
    line-height: 1.4;

    ${FIT} {
        font-size: 13px;
        line-height: 1.3;
    }

    svg {
        margin-top: 3px;
        color: ${theme.colors.warning};
    }
`;

export const Groups = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 440px), 1fr));
    gap: 20px;

    ${FIT} {
        flex: 1 1 0;
        min-height: 0;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
        grid-auto-rows: minmax(0, 1fr);
        gap: 14px;
    }
`;

export const Rows = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;

    ${FIT} {
        gap: 10px;
    }
`;

export const AccountRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px 16px;
    background: rgba(255,255,255,0.02);
    border: 1px solid ${theme.colors.hairline};
    border-radius: ${theme.radius.medium};

    ${FIT} {
        gap: 6px;
        padding: 8px 12px;
    }
`;

export const RowHead = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
`;

export const AccountName = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;

    ${FIT} {
        gap: 1px;
    }

    strong {
        color: ${theme.colors.text};
        font-size: 15px;
        font-weight: 600;
    }

    span {
        color: ${theme.colors.textMuted};
        font-family: ${theme.fonts.mono};
        font-size: 12px;
    }
`;

export const Amount = styled.div<{ $negative: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    text-align: right;

    ${FIT} {
        gap: 1px;
    }

    strong {
        color: ${(props) => (props.$negative ? theme.colors.negative : theme.colors.text)};
        font-family: ${theme.fonts.display};
        font-size: 22px;
        font-weight: 700;
        white-space: nowrap;

        ${FIT} {
            font-size: clamp(15px, 2.3vh, 18px);
        }
    }

    span {
        color: ${theme.colors.textMuted};
        font-size: 12px;
    }
`;

export const Message = styled.div`
    color: ${theme.colors.textMuted};
    font-size: 14px;
`;
