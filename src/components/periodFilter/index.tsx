import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFilter } from "@fortawesome/free-solid-svg-icons";
import { DefaultButtonStyle } from "../button/style";
import Modal from "../modal";
import { PERIOD_OPTIONS, type PeriodId } from "../../utils/period";
import { Check, Option, Options } from "./style";

type PeriodFilterProps = {
    value: PeriodId;
    onChange: (period: PeriodId) => void;
};

export function PeriodFilter({ value, onChange }: PeriodFilterProps) {
    const [open, setOpen] = useState(false);
    const current = PERIOD_OPTIONS.find((option) => option.id === value);

    function select(period: PeriodId) {
        onChange(period);
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
                        <Option key={option.id} type="button" $selected={option.id === value} onClick={() => select(option.id)}>
                            {option.label}
                            <Check>{option.id === value && <FontAwesomeIcon icon={faCheck} />}</Check>
                        </Option>
                    ))}
                </Options>
            </Modal>
        </>
    );
}
