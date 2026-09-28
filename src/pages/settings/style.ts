import styled from "styled-components";
import { FIT } from "../../styles/layout";
import { theme } from "../../styles/theme";

export const Layout = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
    gap: 20px;

    ${FIT} {
        flex: 1 1 0;
        min-height: 0;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-auto-rows: minmax(0, 1fr);
        gap: 14px;
    }
`;

export const Cell = styled.div<{ $span?: number }>`
    min-width: 0;
    min-height: 0;

    ${FIT} {
        grid-column: span ${(props) => props.$span ?? 1};
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const Fields = styled.div<{ $columns?: number }>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.$columns ?? 1}, minmax(0, 1fr));
    gap: 12px;

    @media (max-width: 560px) {
        grid-template-columns: 1fr;
    }
`;

export const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
`;

export const Note = styled.p`
    color: ${theme.colors.textMuted};
    font-size: 13px;
    line-height: 1.5;

    ${FIT} {
        font-size: 12px;
        line-height: 1.4;
    }
`;

export const Success = styled.div`
    color: ${theme.colors.positive};
    font-size: 13px;
`;

export const Failure = styled.div`
    color: ${theme.colors.danger};
    font-size: 13px;
`;

export const DangerButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 40px;
    padding: 0 14px;
    color: ${theme.colors.danger};
    font-size: 13px;
    font-weight: 600;
    background: rgba(248,113,113,0.08);
    border: 1px solid rgba(248,113,113,0.4);
    border-radius: ${theme.radius.medium};
    cursor: pointer;
    transition: background 150ms ease, box-shadow 150ms ease;

    &:hover:not(:disabled) {
        background: rgba(248,113,113,0.16);
        box-shadow: 0 0 18px rgba(248,113,113,0.25);
    }

    &:focus-visible {
        outline: 2px solid ${theme.colors.danger};
        outline-offset: 2px;
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

export const Bullets = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-left: 18px;
    color: ${theme.colors.textMuted};
    font-size: 13px;
    line-height: 1.4;
`;
