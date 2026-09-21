
import styled from "styled-components";
import { theme } from "../../styles/theme";

export const TableWrapper = styled.div`
	width: 100%;
	height: 100%;
	overflow: auto;
	border-radius: ${theme.radius.medium};
	background: rgba(4,8,18,0.45);
	border: 1px solid ${theme.colors.hairline};
`;

export const StyledTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	color: ${theme.colors.text};
	font-size: 13px;
`;

export const Thead = styled.thead`
	position: sticky;
	top: 0;
	z-index: 1;
	background: rgba(9,15,29,0.96);
`;
export const Tbody = styled.tbody``;

export const Tr = styled.tr<{ clickable?: boolean }>`
	border-bottom: 1px solid ${theme.colors.hairline};
	transition: background 120ms ease;
	&:hover {
		background: ${theme.colors.accentSoft};
		cursor: ${(p) => (p.clickable ? "pointer" : "default")};
	}
`;

export const Th = styled.th<{ align?: string; sortable?: boolean }>`
	text-align: ${(p) => p.align ?? "left"};
	padding: 12px 14px;
	font-family: ${theme.fonts.display};
	font-weight: 600;
	font-size: 11px;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: ${theme.colors.textMuted};
	border-bottom: 1px solid ${theme.colors.borderStrong};
	user-select: none;
	${(p) => (p.sortable ? "cursor: pointer;" : "")}
`;

export const Td = styled.td<{ align?: string }>`
	text-align: ${(p) => p.align ?? "left"};
	padding: 11px 14px;
	vertical-align: middle;
	color: ${theme.colors.text};
	font-variant-numeric: ${(p) => (p.align === "right" ? "tabular-nums" : "normal")};
`;

export const EmptyState = styled.div`
	padding: 28px;
	text-align: center;
	color: ${theme.colors.textMuted};
`;

export const PaginationContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 8px;
	padding: 10px 12px;
	position: sticky;
	left: 0;
`;

export const PageButton = styled.button`
	background: rgba(255,255,255,0.03);
	border: 1px solid ${theme.colors.hairline};
	color: ${theme.colors.text};
	min-width: 32px;
	height: 30px;
	border-radius: ${theme.radius.small};
	cursor: pointer;
	transition: border-color 120ms ease, background 120ms ease;
	&:hover:not(:disabled) {
		background: ${theme.colors.accentSoft};
		border-color: ${theme.colors.borderStrong};
	}
	&:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
`;
