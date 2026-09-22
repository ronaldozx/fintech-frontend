import { useAnimatedValue } from "../../hooks/useAnimatedValue";
import { Hint, Label, Tile, Value } from "./style";

type StatTileProps = {
    label: string;
    value: string;
    hero?: boolean;
    accent?: string;
    hint?: string;
};

export function StatTile({ label, value, hero = false, accent, hint }: StatTileProps) {
    const shown = useAnimatedValue(value);

    return (
        <Tile $hero={hero} $accent={accent}>
            <Label>{label}</Label>
            <Value $hero={hero} title={value}>{shown}</Value>
            {hint && <Hint title={hint}>{hint}</Hint>}
        </Tile>
    );
}
