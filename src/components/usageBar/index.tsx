import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { usageTone } from "../../utils/accounts";
import { Fill, Head, Status, Track, Wrapper } from "./style";

type UsageBarProps = {
    label: string;
    detail: string;
    percent: number;
};

const TONE_TEXT = {
    normal: "",
    warning: "Perto do limite",
    critical: "Limite atingido",
};

export function UsageBar({ label, detail, percent }: UsageBarProps) {
    const tone = usageTone(percent);

    return (
        <Wrapper>
            <Head>
                <span>{label}</span>
                <Status $tone={tone}>
                    {tone === "warning" && <FontAwesomeIcon icon={faTriangleExclamation} />}
                    {tone === "critical" && <FontAwesomeIcon icon={faCircleExclamation} />}
                    {percent}% · {detail}
                    {tone !== "normal" && ` · ${TONE_TEXT[tone]}`}
                </Status>
            </Head>
            <Track role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.min(percent, 100)}>
                <Fill $tone={tone} style={{ width: `${Math.min(percent, 100)}%` }} />
            </Track>
        </Wrapper>
    );
}
