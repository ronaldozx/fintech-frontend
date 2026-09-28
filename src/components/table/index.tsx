
import React, { useEffect, useMemo, useState } from "react";
import { useElementSize } from "../../hooks/useElementSize";
import { useFitViewport } from "../../hooks/useFitViewport";
import { theme } from "../../styles/theme";
import {
	TABLE_BORDER,
	TABLE_HEADER_HEIGHT,
	TABLE_PAGER_HEIGHT,
	TABLE_ROW_HEIGHT,
	TableWrapper,
	StyledTable,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	EmptyState,
	PaginationContainer,
	PageButton,
} from "./style";

export type Column<T> = {
	key: string;
	title: string;
	width?: string | number;
	align?: "left" | "center" | "right";
	render?: (row: T) => React.ReactNode;
	sortable?: boolean;
};

export type TableSort = {
	key: string;
	dir: "asc" | "desc";
};

type TableProps<T> = {
	columns: Column<T>[];
	data: T[];
	rowKey?: keyof T | ((row: T) => string | number);
	className?: string;
	loading?: boolean;
	noDataMessage?: string;
	pageSize?: number;
	fitRows?: boolean;
	pager?: boolean;
	onFitRows?: (rows: number) => void;
	onRowClick?: (row: T) => void;
	sort?: TableSort;
	onSortChange?: (sort: TableSort) => void;
};

function defaultRowKey<T>(row: T) {
	const r = row as unknown as Record<string, unknown>;
	if (r && (r["id"] || r["_id"])) return String(r["id"] ?? r["_id"]);
	return JSON.stringify(row);
}

export function Table<T extends Record<string, unknown>>(props: TableProps<T>): React.ReactElement {
	const {
		columns,
		data,
		rowKey,
		className,
		loading,
		noDataMessage = "Nenhum dado disponível",
		pageSize: defaultPageSize = 10,
		fitRows = false,
		pager = true,
		onFitRows,
		onRowClick,
		sort,
		onSortChange,
	} = props;

	const manual = onSortChange !== undefined;
	const fitViewport = useFitViewport();
	const { ref: wrapperRef, height: wrapperHeight } = useElementSize<HTMLDivElement>();
	const measured = fitRows && fitViewport && wrapperHeight > 0;
	const rowsWithoutPager = Math.max(1, Math.floor((wrapperHeight - TABLE_BORDER - TABLE_HEADER_HEIGHT) / TABLE_ROW_HEIGHT));
	const rowsWithPager = Math.max(1, Math.floor((wrapperHeight - TABLE_BORDER - TABLE_HEADER_HEIGHT - TABLE_PAGER_HEIGHT) / TABLE_ROW_HEIGHT));
	const [localSortBy, setSortBy] = useState<string | null>(null);
	const [localSortDir, setSortDir] = useState<"asc" | "desc">("asc");
	const [page, setPage] = useState(1);
	const sortBy = manual ? (sort?.key ?? null) : localSortBy;
	const sortDir = manual ? (sort?.dir ?? "asc") : localSortDir;

	const processed = useMemo(() => {
		const list = [...data];
		if (!manual && sortBy) {
			list.sort((a, b) => {
				const aa = a as unknown as Record<string, unknown>;
				const bb = b as unknown as Record<string, unknown>;
				const va = aa[sortBy as string];
				const vb = bb[sortBy as string];
				if (va == null && vb == null) return 0;
				if (va == null) return -1;
				if (vb == null) return 1;
				if (typeof va === "number" && typeof vb === "number") {
					return sortDir === "asc" ? (va as number) - (vb as number) : (vb as number) - (va as number);
				}
				const sa = String(va).localeCompare(String(vb), undefined, { numeric: true });
				return sortDir === "asc" ? sa : -sa;
			});
		}
		return list;
	}, [data, sortBy, sortDir, manual]);

	const showPager = pager || !measured;
	const pageSize = !measured ? defaultPageSize : processed.length > rowsWithoutPager && pager ? rowsWithPager : rowsWithoutPager;
	const totalPages = Math.max(1, Math.ceil(processed.length / pageSize));
	const currentPage = Math.min(page, totalPages);
	const pageData = useMemo(() => {
		if (manual) return processed;
		const start = (currentPage - 1) * pageSize;
		return processed.slice(start, start + pageSize);
	}, [processed, currentPage, pageSize, manual]);

	useEffect(() => {
		if (measured && manual) onFitRows?.(rowsWithoutPager);
	}, [measured, manual, rowsWithoutPager, onFitRows]);

	function handleSort(col: Column<T>) {
		if (!col.sortable) return;
		if (onSortChange) {
			onSortChange({ key: col.key, dir: sortBy === col.key && sortDir === "asc" ? "desc" : "asc" });
			return;
		}
		if (sortBy === col.key) {
			setSortDir((d) => (d === "asc" ? "desc" : "asc"));
		} else {
			setSortBy(col.key);
			setSortDir("asc");
		}
		setPage(1);
	}

	return (
		<TableWrapper ref={wrapperRef} className={className}>
			<StyledTable role="table">
				<Thead>
					<Tr>
						{columns.map((col) => (
							<Th key={col.key} style={{ width: col.width }} align={col.align} onClick={() => handleSort(col)} sortable={!!col.sortable}>
								<div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: col.align === "right" ? "flex-end" : col.align === "center" ? "center" : "flex-start" }}>
									<span>{col.title}</span>
									{col.sortable && sortBy === col.key ? <small>{sortDir === "asc" ? "↑" : "↓"}</small> : null}
								</div>
							</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{loading ? (
						<Tr>
							<Td colSpan={columns.length}>
								<EmptyState>Carregando...</EmptyState>
							</Td>
						</Tr>
					) : pageData.length === 0 ? (
						<Tr>
							<Td colSpan={columns.length}>
								<EmptyState>{noDataMessage}</EmptyState>
							</Td>
						</Tr>
					) : (
						pageData.map((row, idx) => {
							const keyValue = typeof rowKey === "function" ? rowKey(row) : ((row as unknown as Record<string, unknown>)[rowKey as string] ?? defaultRowKey(row));
							return (
								<Tr key={String(keyValue) + "-" + idx} onClick={() => onRowClick?.(row)} clickable={!!onRowClick}>
									{columns.map((col) => (
										<Td key={col.key} align={col.align}>
											{col.render ? col.render(row) : String((row as unknown as Record<string, unknown>)[col.key] ?? "")}
										</Td>
									))}
								</Tr>
							);
						})
					)}
				</Tbody>
			</StyledTable>

			{!manual && showPager && processed.length > pageSize && (
				<PaginationContainer>
					<PageButton onClick={() => setPage(1)} disabled={currentPage === 1}>
						«
					</PageButton>
					<PageButton onClick={() => setPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
						‹
					</PageButton>
					<div style={{ padding: "0 8px", color: theme.colors.textMuted }}>
						Página {currentPage} / {totalPages}
					</div>
					<PageButton onClick={() => setPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
						›
					</PageButton>
					<PageButton onClick={() => setPage(totalPages)} disabled={currentPage === totalPages}>
						»
					</PageButton>
				</PaginationContainer>
			)}
		</TableWrapper>
	);
}

export default Table;
