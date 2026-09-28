import styled from "styled-components";
import { FIT } from "../../styles/layout";
import { theme } from "../../styles/theme";

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
	background: rgba(4,8,18,0.7);
	border: 1px solid ${theme.colors.border};
	padding: 11px 14px;
	border-radius: ${theme.radius.medium};
	${FIT} {
		padding: 8px 14px;
	}
	transition: border-color 150ms ease, box-shadow 150ms ease;
	&:focus-within {
		border-color: ${theme.colors.accent};
		box-shadow: 0 0 0 3px ${theme.colors.accentSoft}, ${theme.glow.accent};
	}
`;

export const StyledInput = styled.input`
	background: transparent;
	border: none;
	outline: none;
	color: ${theme.colors.text};
	width: 100%;
	font-size: 14px;
	font-family: inherit;
	color-scheme: dark;
	&::placeholder {
		color: ${theme.colors.textFaint};
	}
`;

export const Label = styled.label`
	font-family: ${theme.fonts.display};
	font-size: 11px;
	font-weight: 600;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: ${theme.colors.textMuted};
`;

export const ErrorText = styled.span`
	font-size: 12px;
	color: ${theme.colors.danger};
`;
