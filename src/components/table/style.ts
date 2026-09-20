
import styled from "styled-components";

export const TableWrapper = styled.div`
	width: 100%;
    height: 100%;
	overflow: auto;
	border-radius: 10px;
	background: rgba(255,255,255,0.02);
	border: 1px solid rgba(255,255,255,0.04);
	padding: 12px;
`;

export const StyledTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	color: #E2E8F0;
	font-size: 14px;
`;

export const Thead = styled.thead``;
export const Tbody = styled.tbody``;

export const Tr = styled.tr<{ clickable?: boolean }>`
	border-bottom: 1px solid rgba(255, 0, 0, 0.03);
	transition: background 120ms ease;
	&:hover {
		background: rgba(79,209,197,0.02);
		cursor: ${(p) => (p.clickable ? "pointer" : "default")};
	}
`;

export const Th = styled.th<{ align?: string; sortable?: boolean }>`
	text-align: ${(p) => p.align ?? "left"};
	padding: 10px 12px;
	font-weight: 700;
	font-size: 13px;
	color: #94A3B8;
	user-select: none;
	${(p) => (p.sortable ? "cursor: pointer;" : "")}
`;

export const Td = styled.td<{ align?: string }>`
	text-align: ${(p) => p.align ?? "left"};
	padding: 12px;
	vertical-align: middle;
	color: #E2E8F0;
	border-bottom: 1px solid rgba(255, 255, 255, 0.25);
	border-top: 1px solid rgba(255, 255, 255, 0.25);
`;

export const EmptyState = styled.div`
	padding: 28px;
	text-align: center;
	color: #94A3B8;
`;

export const PaginationContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 8px;
	margin-top: 12px;
`;

export const PageButton = styled.button`
	background: rgba(255,255,255,0.02);
	border: 1px solid rgba(255,255,255,0.04);
	color: #E2E8F0;
	padding: 6px 10px;
	border-radius: 8px;
	cursor: pointer;
	&:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}
`;
