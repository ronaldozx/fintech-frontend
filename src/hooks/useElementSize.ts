import { useEffect, useState } from "react";

type Size = {
    width: number;
    height: number;
};

export function useElementSize<T extends HTMLElement>() {
    const [element, setElement] = useState<T | null>(null);
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });

    useEffect(() => {
        if (!element) return;

        const observer = new ResizeObserver(([entry]) => {
            setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
        });
        observer.observe(element);

        return () => observer.disconnect();
    }, [element]);

    return { ref: setElement, width: size.width, height: size.height };
}
