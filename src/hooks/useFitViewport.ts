import { useEffect, useState } from "react";
import { FIT_QUERY } from "../styles/layout";

export function useFitViewport() {
    const [fit, setFit] = useState(() => window.matchMedia(FIT_QUERY).matches);

    useEffect(() => {
        const media = window.matchMedia(FIT_QUERY);
        const update = () => setFit(media.matches);

        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    return fit;
}
