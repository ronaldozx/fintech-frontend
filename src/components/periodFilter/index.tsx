import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFilter } from "@fortawesome/free-solid-svg-icons";
import { DefaultButtonStyle } from "../button/style";
import Modal from "../modal";
import { PERIOD_OPTIONS, type PeriodMonths } from "../../utils/period";
import { Check, Option, Options } from "./style";

type PeriodFilterProps = {
    value: PeriodMonths;
    onChange: (months: PeriodMonths) => void;
};

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
    const [open, setOpen] = useState(false);
    const current = PERIOD_OPTIONS.find((option) => option.months === value);

    function select(months: PeriodMonths) {
        onChange(months);
        setOpen(false);
    }

    return (
        <>
            <DefaultButtonStyle onClick={() => setOpen(true)} title="Período">
                <FontAwesomeIcon icon={faFilter} /> {current?.label}
            </DefaultButtonStyle>

            <Modal isOpen={open} onClose={() => setOpen(false)} title="Período">
                <Options>
                    {PERIOD_OPTIONS.map((option) => (
                        <Option key={option.months} type="button" $selected={option.months === value} onClick={() => select(option.months)}>
                            {option.label}
                            <Check>{option.months === value && <FontAwesomeIcon icon={faCheck} />}</Check>
                        </Option>
                    ))}
                </Options>
            </Modal>
        </>
    );
}
