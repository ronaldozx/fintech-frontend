import { useEffect, useMemo, useRef, useState } from "react";
import { easeOutCubic, parseAnimatable } from "../utils/animatedValue";

const DURATION_MS = 700;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useAnimatedValue(text: string) {
    const animatable = useMemo(() => parseAnimatable(text), [text]);
    const [value, setValue] = useState(0);
    const current = useRef(0);

    useEffect(() => {
        if (animatable === null || prefersReducedMotion()) return;

        const from = current.current;
        const start = performance.now();
        let frame = 0;

        const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / DURATION_MS);
            const next = progress === 1 ? animatable.target : from + (animatable.target - from) * easeOutCubic(progress);
            current.current = next;
            setValue(next);
            if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [animatable]);

    if (animatable === null || prefersReducedMotion()) return text;
    return value === animatable.target ? text : animatable.format(value);
}
