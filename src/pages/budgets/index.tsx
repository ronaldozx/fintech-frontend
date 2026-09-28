import { useState } from "react";
import { SegmentedControl, type SegmentedOption } from "../../components/segmentedControl";
import { BudgetsView } from "./BudgetsView";
import { GoalsView } from "./GoalsView";

type View = "budgets" | "goals";

const OPTIONS: SegmentedOption<View>[] = [
    { value: "budgets", label: "Orçamentos" },
    { value: "goals", label: "Metas" },
];

export function Budgets() {
    const [view, setView] = useState<View>("budgets");
    const switcher = <SegmentedControl label="Ver orçamentos ou metas" value={view} options={OPTIONS} onChange={setView} />;

    return view === "budgets" ? <BudgetsView switcher={switcher} /> : <GoalsView switcher={switcher} />;
}
