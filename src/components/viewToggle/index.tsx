import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn, faTable } from "@fortawesome/free-solid-svg-icons";
import { ToggleButton } from "./style";

export type ChartView = "chart" | "table";

type ViewToggleProps = {
    view: ChartView;
    onChange: (view: ChartView) => void;
};

export function ViewToggle({ view, onChange }: ViewToggleProps) {
    const showTable = view === "chart";
    const label = showTable ? "Ver como tabela" : "Ver como gráfico";

    return (
        <ToggleButton type="button" title={label} aria-label={label} onClick={() => onChange(showTable ? "table" : "chart")}>
            <FontAwesomeIcon icon={showTable ? faTable : faChartColumn} />
        </ToggleButton>
    );
}
