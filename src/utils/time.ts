const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const formatRelative = (iso: string, now: Date = new Date()) => {
    const elapsed = Math.max(0, now.getTime() - new Date(iso).getTime());

    if (elapsed < MINUTE) return "agora";
    if (elapsed < HOUR) return `há ${Math.floor(elapsed / MINUTE)} min`;
    if (elapsed < DAY) return `há ${Math.floor(elapsed / HOUR)} h`;

    const days = Math.floor(elapsed / DAY);
    return days === 1 ? "há 1 dia" : `há ${days} dias`;
};
