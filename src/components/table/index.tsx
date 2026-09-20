
import React, { useMemo, useState } from "react";
import {
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

type TableProps<T> = {
	columns: Column<T>[];
	data: T[];
	rowKey?: keyof T | ((row: T) => string | number);
	className?: string;
	loading?: boolean;
	noDataMessage?: string;
	pageSize?: number;
	onRowClick?: (row: T) => void;
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
		pageSize = 10,
		onRowClick,
	} = props;

	const [sortBy, setSortBy] = useState<string | null>(null);
	const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
	const [page, setPage] = useState(1);

	const processed = useMemo(() => {
		const list = [...data];
		if (sortBy) {
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
	}, [data, sortBy, sortDir]);

	const totalPages = Math.max(1, Math.ceil(processed.length / pageSize));
	const pageData = useMemo(() => {
		const start = (page - 1) * pageSize;
		return processed.slice(start, start + pageSize);
	}, [processed, page, pageSize]);

	function handleSort(col: Column<T>) {
		if (!col.sortable) return;
		if (sortBy === col.key) {
			setSortDir((d) => (d === "asc" ? "desc" : "asc"));
		} else {
			setSortBy(col.key);
			setSortDir("asc");
		}
		setPage(1);
	}

	return (
		<TableWrapper className={className}>
			<StyledTable role="table">
				<Thead>
					<Tr>
						{columns.map((col) => (
							<Th key={col.key} style={{ width: col.width }} align={col.align} onClick={() => handleSort(col)} sortable={!!col.sortable}>
								<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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

			{processed.length > pageSize && (
				<PaginationContainer>
					<PageButton onClick={() => setPage(1)} disabled={page === 1}>
						«
					</PageButton>
					<PageButton onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
						‹
					</PageButton>
					<div style={{ padding: "0 8px", color: "#94A3B8" }}>
						Página {page} / {totalPages}
					</div>
					<PageButton onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
						›
					</PageButton>
					<PageButton onClick={() => setPage(totalPages)} disabled={page === totalPages}>
						»
					</PageButton>
				</PaginationContainer>
			)}
		</TableWrapper>
	);
}

export default Table;
