import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 6px;
	width: 100%;
`;

export const InputContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	background: #0f1720;
	border: 1px solid #2b3138;
	padding: 10px 12px;
	border-radius: 8px;
	transition: border-color 150ms ease, box-shadow 150ms ease;
	&:focus-within {
		border-color: #4FD1C5;
		box-shadow: 0 0 0 4px rgba(79, 209, 197, 0.06);
	}
`;

export const StyledInput = styled.input`
	background: transparent;
	border: none;
	outline: none;
	color: #E2E8F0;
	width: 100%;
	font-size: 14px;
	font-family: inherit;
	&::placeholder {
		color: #94A3B8;
	}
`;

export const Label = styled.label`
	font-size: 12px;
	color: #94A3B8;
`;

export const ErrorText = styled.span`
	font-size: 12px;
	color: #FF6B6B;
`;

