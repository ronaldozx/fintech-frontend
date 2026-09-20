import React, { forwardRef } from "react";
import { Wrapper, InputContainer, StyledInput, Label, ErrorText } from "./style";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	error?: string;
	icon?: React.ReactNode;
	width?: string | number;
};

export const CustomInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const { label, error, icon, width, ...rest } = props;

	return (
		<Wrapper style={{ width: width ?? "100%" }}>
			{label && <Label>{label}</Label>}
			<InputContainer>
				{icon}
				<StyledInput ref={ref} {...rest} />
			</InputContainer>
			{error && <ErrorText>{error}</ErrorText>}
		</Wrapper>
	);
});

CustomInput.displayName = "CustomInput";

export default CustomInput;

