import type { ReactNode } from "react";
import { useElementSize } from "../../hooks/useElementSize";
import { useFitViewport } from "../../hooks/useFitViewport";
import { List, MORE_HEIGHT, More, ROW_GAP, ROW_HEIGHT } from "./style";

type FitListProps<T> = {
    items: T[];
    renderItem: (item: T) => ReactNode;
};

const ROW_STEP = ROW_HEIGHT + ROW_GAP;

export function FitList<T>({ items, renderItem }: FitListProps<T>) {
    const fitViewport = useFitViewport();
    const { ref, height } = useElementSize<HTMLUListElement>();

    const measured = fitViewport && height > 0;
    const fitsAll = Math.floor((height + ROW_GAP) / ROW_STEP);
    const fitsWithNote = Math.floor((height - MORE_HEIGHT) / ROW_STEP);
    const visible = !measured || items.length <= fitsAll ? items.length : Math.max(1, fitsWithNote);
    const hidden = items.length - visible;

    return (
        <List ref={ref}>
            {items.slice(0, visible).map(renderItem)}
            {hidden > 0 && <More title="Aumente a janela para ver todos">+{hidden} mais</More>}
        </List>
    );
}
