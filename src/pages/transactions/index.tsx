import { useCallback, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faMagnifyingGlass, faPlus, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { DefaultButtonStyle } from "../../components/button/style";
import { CustomInput } from "../../components/customInput";
import { Frame } from "../../components/frame";
import { ManualTag, NeutralTag } from "../../components/neutralTag";
import { Fill } from "../../components/pageFill/style";
import { PageHeader } from "../../components/pageHeader";
import { Pagination } from "../../components/pagination";
import { PeriodFilter } from "../../components/periodFilter";
import { SelectField, type SelectOption } from "../../components/selectField";
import { StatTile } from "../../components/statTile";
import { TransactionModal } from "../../components/transactionModal";
import Table, { type Column, type TableSort } from "../../components/table";
import { ErrorText, Success } from "../../components/bankConnections/style";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { useFitViewport } from "../../hooks/useFitViewport";
import { useTransactionCategories, useTransactionSearch } from "../../hooks/useTransactionSearch";
import { downloadTransactionsCsv, reconcileTransfers } from "../../services/transaction";
import { chartColors } from "../../styles/chart";
import { theme } from "../../styles/theme";
import { formatDate, formatMoney } from "../../utils/format";
import { getPeriodRange, type PeriodId } from "../../utils/period";
import type { TransactionFilters, TransactionQuery, TransactionRow, TransactionScope } from "../../types/Transaction";
import { FiltersPanel, Muted, ResultsCell, SearchField, TableArea, TotalsRow } from "./style";

const PAGE_SIZE = 50;
const SEARCH_DELAY_MS = 350;

const EMPTY_FILTERS: TransactionFilters = { q: "", category: "", type: "", paymentMethod: "", scope: "all" };

const TYPE_OPTIONS: SelectOption<TransactionFilters["type"]>[] = [
    { value: "", label: "Todos" },
    { value: "INCOME", label: "Receitas" },
    { value: "EXPENSE", label: "Despesas" },
];

const METHOD_OPTIONS: SelectOption<TransactionFilters["paymentMethod"]>[] = [
    { value: "", label: "Todas" },
    { value: "CREDIT", label: "Crédito" },
    { value: "DEBIT", label: "Débito" },
];

const SCOPE_OPTIONS: SelectOption<TransactionScope>[] = [
    { value: "all", label: "Todas" },
    { value: "counted", label: "Contam nos totais" },
    { value: "neutral", label: "Fora dos totais" },
];

const columns: Column<TransactionRow>[] = [
    { key: "date", title: "Data", width: 110, sortable: true, render: (row) => formatDate(row.date) },
    { key: "description", title: "Descrição", sortable: true },
    {
        key: "category",
        title: "Categoria",
        width: 220,
        sortable: true,
        render: (row) => (
            <>
                {row.category ?? "Outros"}
                {row.manual && <ManualTag />}
                {row.neutral && <NeutralTag reason={row.neutralReason} />}
            </>
        ),
    },
    { key: "paymentMethod", title: "Pagamento", width: 110, render: (row) => (row.paymentMethod === "CREDIT" ? "Crédito" : "Débito") },
    {
        key: "amount",
        title: "Valor",
        width: 160,
        align: "right",
        sortable: true,
        render: (row) => (
            <span style={{ color: row.amount < 0 ? theme.colors.negative : theme.colors.positive, whiteSpace: "nowrap" }}>
                {row.amount < 0 ? "- " : "+ "}
                {formatMoney(Math.abs(row.amount))}
            </span>
        ),
    },
];

export function Transactions() {
    const [period, setPeriod] = useState<PeriodId>("12m");
    const [filters, setFilters] = useState<TransactionFilters>(EMPTY_FILTERS);
    const [page, setPage] = useState(0);
    const [sort, setSort] = useState<TableSort>({ key: "date", dir: "desc" });
    const [exporting, setExporting] = useState(false);
    const [exportError, setExportError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);
    const [editing, setEditing] = useState<TransactionRow | "new" | null>(null);
    const [reconciling, setReconciling] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [fitSize, setFitSize] = useState<number | null>(null);
    const fitSizeRef = useRef<number | null>(null);
    const fitViewport = useFitViewport();

    const debouncedText = useDebouncedValue(filters.q, SEARCH_DELAY_MS);
    const categories = useTransactionCategories(reloadKey);
    const range = useMemo(() => getPeriodRange(period), [period]);

    const query = useMemo<TransactionQuery>(
        () => ({
            range,
            filters: { ...filters, q: debouncedText },
            page,
            size: fitViewport && fitSize ? fitSize : PAGE_SIZE,
            sortKey: sort.key,
            sortDir: sort.dir,
        }),
        [range, filters, debouncedText, page, sort, fitViewport, fitSize],
    );

    const { data, loading, error } = useTransactionSearch(query, reloadKey);

    const categoryOptions = useMemo<SelectOption<string>[]>(
        () => [{ value: "", label: "Todas" }, ...categories.map((category) => ({ value: category, label: category }))],
        [categories],
    );

    const handleFitRows = useCallback((rows: number) => {
        if (fitSizeRef.current === rows) return;
        fitSizeRef.current = rows;
        setFitSize(rows);
        setPage(0);
    }, []);

    function changeFilters(patch: Partial<TransactionFilters>) {
        setFilters((current) => ({ ...current, ...patch }));
        setPage(0);
    }

    function changePeriod(next: PeriodId) {
        setPeriod(next);
        setPage(0);
    }

    function changeSort(next: TableSort) {
        setSort(next);
        setPage(0);
    }

    function handleSaved() {
        setEditing(null);
        setReloadKey((key) => key + 1);
    }

    async function handleReconcile() {
        setReconciling(true);
        setExportError(null);
        setFeedback(null);
        try {
            const pairs = await reconcileTransfers();
            setFeedback(
                pairs > 0
                    ? `${pairs} transferência(s) entre as suas contas foram tiradas dos totais`
                    : "Nenhuma transferência nova entre as suas contas foi encontrada",
            );
            setReloadKey((key) => key + 1);
        } catch (err) {
            setExportError(err instanceof Error ? err.message : "Erro ao conciliar transferências");
        } finally {
            setReconciling(false);
        }
    }

    async function handleExport() {
        setExporting(true);
        setExportError(null);
        try {
            await downloadTransactionsCsv(query);
        } catch (err) {
            setExportError(err instanceof Error ? err.message : "Erro ao exportar");
        } finally {
            setExporting(false);
        }
    }

    const income = data?.totalIncome ?? 0;
    const expense = data?.totalExpense ?? 0;
    const total = data?.transactions.totalElements ?? 0;
    const format = (value: number) => (data ? formatMoney(value) : "—");

    return (
        <>
            <PageHeader
                title="Transações"
                subtitle={`${formatDate(range.startDate)} → ${formatDate(range.endDate)}`}
                actions={
                    <>
                        <PeriodFilter value={period} onChange={changePeriod} />
                        <DefaultButtonStyle onClick={() => setEditing("new")} title="Registrar uma transação que o banco não mostra">
                            <FontAwesomeIcon icon={faPlus} /> Nova
                        </DefaultButtonStyle>
                        <DefaultButtonStyle onClick={handleReconcile} disabled={reconciling} title="Tirar dos totais as transferências entre as suas contas">
                            <FontAwesomeIcon icon={faRightLeft} /> {reconciling ? "Conciliando..." : "Conciliar"}
                        </DefaultButtonStyle>
                        <DefaultButtonStyle onClick={handleExport} disabled={exporting || total === 0} title="Baixar o resultado do filtro em CSV">
                            <FontAwesomeIcon icon={faDownload} /> {exporting ? "Exportando..." : "Exportar CSV"}
                        </DefaultButtonStyle>
                    </>
                }
            />

            {exportError && <ErrorText>{exportError}</ErrorText>}
            {feedback && <Success>{feedback}</Success>}

            <FiltersPanel aria-label="Filtros">
                <SearchField>
                    <CustomInput
                        label="Buscar"
                        placeholder="Descrição ou categoria"
                        value={filters.q}
                        onChange={(event) => changeFilters({ q: event.target.value })}
                        icon={<FontAwesomeIcon icon={faMagnifyingGlass} color={theme.colors.textMuted} />}
                    />
                </SearchField>
                <SelectField label="Categoria" value={filters.category} options={categoryOptions} onChange={(category) => changeFilters({ category })} />
                <SelectField label="Tipo" value={filters.type} options={TYPE_OPTIONS} onChange={(type) => changeFilters({ type })} />
                <SelectField label="Pagamento" value={filters.paymentMethod} options={METHOD_OPTIONS} onChange={(paymentMethod) => changeFilters({ paymentMethod })} />
                <SelectField label="Considerar" value={filters.scope} options={SCOPE_OPTIONS} onChange={(scope) => changeFilters({ scope })} />
            </FiltersPanel>

            <TotalsRow $stale={loading}>
                <StatTile label="Receitas do filtro" value={format(income)} accent={chartColors.income} hint={`${total} transações encontradas`} />
                <StatTile label="Despesas do filtro" value={format(expense)} accent={chartColors.expense} hint="Não inclui o que está fora dos totais" />
                <StatTile label="Saldo do filtro" value={format(income - expense)} hero />
            </TotalsRow>

            <Fill>
            <ResultsCell>
                <Frame title="Resultados">
                    {error && <ErrorText>{error}</ErrorText>}
                    <TableArea $stale={loading && data !== null}>
                        <Table
                            data={data?.transactions.content ?? []}
                            columns={columns}
                            rowKey="id"
                            loading={loading && data === null}
                            sort={sort}
                            onSortChange={changeSort}
                            fitRows
                            onFitRows={handleFitRows}
                            onRowClick={setEditing}
                            noDataMessage="Nenhuma transação encontrada com esses filtros."
                        />
                    </TableArea>
                    {data && data.transactions.totalPages > 0 && (
                        <Pagination page={page} totalPages={data.transactions.totalPages} totalItems={total} onChange={setPage} />
                    )}
                    {data && data.transactions.totalPages === 0 && <Muted>Ajuste os filtros ou o período para ver resultados.</Muted>}
                </Frame>
            </ResultsCell>
            </Fill>

            {editing && <TransactionModal target={editing} categories={categories} onClose={() => setEditing(null)} onSaved={handleSaved} />}
        </>
    );
}
