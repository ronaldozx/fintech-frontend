import { Label, Select, Wrapper } from "./style";

export type SelectOption<T extends string> = {
    value: T;
    label: string;
};

type SelectFieldProps<T extends string> = {
    label: string;
    value: T;
    options: SelectOption<T>[];
    onChange: (value: T) => void;
};

export function SelectField<T extends string>({ label, value, options, onChange }: SelectFieldProps<T>) {
    return (
        <Wrapper>
            <Label>{label}</Label>
            <Select value={value} onChange={(event) => onChange(event.target.value as T)}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
        </Wrapper>
    );
}
