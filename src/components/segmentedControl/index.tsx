import { Option, Wrapper } from "./style";

export type SegmentedOption<T extends string> = {
    value: T;
    label: string;
};

type SegmentedControlProps<T extends string> = {
    label: string;
    value: T;
    options: SegmentedOption<T>[];
    onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({ label, value, options, onChange }: SegmentedControlProps<T>) {
    return (
        <Wrapper role="tablist" aria-label={label}>
            {options.map((option) => (
                <Option
                    key={option.value}
                    type="button"
                    role="tab"
                    aria-selected={option.value === value}
                    $active={option.value === value}
                    onClick={() => onChange(option.value)}
                >
                    {option.label}
                </Option>
            ))}
        </Wrapper>
    );
}
