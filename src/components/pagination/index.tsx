import { PageButton, PaginationContainer } from "../table/style";
import { theme } from "../../styles/theme";

type PaginationProps = {
    page: number;
    totalPages: number;
    totalItems: number;
    onChange: (page: number) => void;
};

export function Pagination({ page, totalPages, totalItems, onChange }: PaginationProps) {
    const last = Math.max(0, totalPages - 1);

    return (
        <PaginationContainer style={{ justifyContent: "space-between" }}>
            <span style={{ color: theme.colors.textMuted, fontSize: 13 }}>{totalItems} transações</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <PageButton onClick={() => onChange(0)} disabled={page === 0} aria-label="Primeira página">
                    «
                </PageButton>
                <PageButton onClick={() => onChange(page - 1)} disabled={page === 0} aria-label="Página anterior">
                    ‹
                </PageButton>
                <span style={{ padding: "0 8px", color: theme.colors.textMuted, fontSize: 13 }}>
                    Página {Math.min(page, last) + 1} / {Math.max(1, totalPages)}
                </span>
                <PageButton onClick={() => onChange(page + 1)} disabled={page >= last} aria-label="Próxima página">
                    ›
                </PageButton>
                <PageButton onClick={() => onChange(last)} disabled={page >= last} aria-label="Última página">
                    »
                </PageButton>
            </div>
        </PaginationContainer>
    );
}
