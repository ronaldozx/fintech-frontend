import type { ReactNode } from "react";
import { useElementSize } from "../../hooks/useElementSize";
import { useFitViewport } from "../../hooks/useFitViewport";
import { ListBox, More } from "./style";

const MORE_HEIGHT = 16;

type FitListProps<T> = {
    items: T[];
    rowHeight: number;
    gap: number;
    renderItem: (item: T) => ReactNode;
};

export function FitList<T>({ items, rowHeight, gap, renderItem }: FitListProps<T>) {
    const fitViewport = useFitViewport();
    const { ref, height } = useElementSize<HTMLUListElement>();

    const step = rowHeight + gap;
    const measured = fitViewport && height > 0;
    const fitsAll = Math.floor((height + gap) / step);
    const fitsWithNote = Math.floor((height - MORE_HEIGHT) / step);
    const visible = !measured || items.length <= fitsAll ? items.length : Math.max(1, fitsWithNote);
    const hidden = items.length - visible;

    return (
        <ListBox ref={ref} $gap={gap}>
            {items.slice(0, visible).map(renderItem)}
            {hidden > 0 && <More $height={MORE_HEIGHT} title="Aumente a janela para ver todos">+{hidden} mais</More>}
        </ListBox>
    );
}
