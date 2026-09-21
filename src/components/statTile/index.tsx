import { Hint, Label, Tile, Value } from "./style";

type StatTileProps = {
    label: string;
    value: string;
    hero?: boolean;
    accent?: string;
    hint?: string;
};

export function StatTile({ label, value, hero = false, accent, hint }: StatTileProps) {
    return (
        <Tile $hero={hero} $accent={accent}>
            <Label>{label}</Label>
            <Value $hero={hero}>{value}</Value>
            {hint && <Hint>{hint}</Hint>}
        </Tile>
    );
}
