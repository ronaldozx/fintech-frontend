import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { DefaultButtonStyle } from "../button/style";
import { currentMonth, formatMonthLabel, shiftMonth } from "../../utils/month";
import { Label, Wrapper } from "./style";

type MonthNavigatorProps = {
    month: string;
    onChange: (month: string) => void;
};

export function MonthNavigator({ month, onChange }: MonthNavigatorProps) {
    return (
        <Wrapper>
            <DefaultButtonStyle onClick={() => onChange(shiftMonth(month, -1))} aria-label="Mês anterior">
                <FontAwesomeIcon icon={faChevronLeft} />
            </DefaultButtonStyle>
            <Label>{formatMonthLabel(month)}</Label>
            <DefaultButtonStyle onClick={() => onChange(shiftMonth(month, 1))} disabled={month >= currentMonth()} aria-label="Próximo mês">
                <FontAwesomeIcon icon={faChevronRight} />
            </DefaultButtonStyle>
        </Wrapper>
    );
}
