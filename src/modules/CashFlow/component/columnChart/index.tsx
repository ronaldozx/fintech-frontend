import { useState } from "react";
import { useElementSize } from "../../../../hooks/useElementSize";
import { chartColors } from "../../../../styles/chart";
import { columnPath, formatCompact, formatMonthYear, niceScale, type MonthPoint } from "../../../../utils/chart";
import { formatMoney } from "../../../../utils/format";
import {
    BarGroup,
    Frame,
    HitArea,
    Legend,
    LegendItem,
    Swatch,
    Tooltip,
    TooltipKey,
    TooltipRow,
    TooltipTitle,
    TooltipValue,
} from "./style";

type ColumnChartProps = {
    points: MonthPoint[];
};

const MARGIN = { top: 16, right: 8, bottom: 22, left: 44 };
const MAX_BAR_WIDTH = 24;
const BAR_GAP = 2;
const BAR_RADIUS = 4;
const MIN_LABEL_SLOT = 26;
const TOOLTIP_HALF_WIDTH = 70;

export function ColumnChart({ points }: ColumnChartProps) {
    const { ref, width, height } = useElementSize<HTMLDivElement>();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const plotWidth = Math.max(0, width - MARGIN.left - MARGIN.right);
    const plotHeight = Math.max(0, height - MARGIN.top - MARGIN.bottom);
    const maxValue = Math.max(0, ...points.flatMap((point) => [point.income, point.expense]));
    const scale = niceScale(maxValue);
    const slot = points.length === 0 ? 0 : plotWidth / points.length;
    const barWidth = Math.max(2, Math.min(MAX_BAR_WIDTH, (slot * 0.72 - BAR_GAP) / 2));

    const yOf = (value: number) => MARGIN.top + plotHeight * (1 - value / scale.max);
    const heightOf = (value: number) => plotHeight * (value / scale.max);
    const centerOf = (index: number) => MARGIN.left + slot * index + slot / 2;

    const peak = points.reduce(
        (best, point, index) => {
            if (point.income > best.value) return { index, value: point.income, series: "income" as const };
            if (point.expense > best.value) return { index, value: point.expense, series: "expense" as const };
            return best;
        },
        { index: -1, value: 0, series: "income" as "income" | "expense" },
    );

    const active = activeIndex === null ? null : points[activeIndex];
    const showEveryLabel = slot >= MIN_LABEL_SLOT;

    return (
        <>
            <Legend>
                <LegendItem>
                    <Swatch $color={chartColors.income} /> Receitas
                </LegendItem>
                <LegendItem>
                    <Swatch $color={chartColors.expense} /> Despesas
                </LegendItem>
            </Legend>

            <Frame ref={ref}>
                {width > 0 && height > 0 && (
                    <svg width={width} height={height} role="img" aria-label="Receitas e despesas por mês">
                        {scale.ticks.map((tick) => (
                            <g key={tick}>
                                <line
                                    x1={MARGIN.left}
                                    x2={MARGIN.left + plotWidth}
                                    y1={yOf(tick)}
                                    y2={yOf(tick)}
                                    stroke={tick === 0 ? chartColors.axis : chartColors.grid}
                                    strokeWidth={1}
                                />
                                <text x={MARGIN.left - 6} y={yOf(tick) + 3.5} textAnchor="end" fontSize={10} fill={chartColors.textSecondary}>
                                    {formatCompact(tick)}
                                </text>
                            </g>
                        ))}

                        {points.map((point, index) => {
                            const center = centerOf(index);
                            const incomeHeight = heightOf(point.income);
                            const expenseHeight = heightOf(point.expense);

                            return (
                                <g key={point.month}>
                                    <BarGroup $active={activeIndex === index}>
                                        {point.income > 0 && (
                                            <path
                                                d={columnPath(center - BAR_GAP / 2 - barWidth, yOf(point.income), barWidth, incomeHeight, BAR_RADIUS)}
                                                fill={chartColors.income}
                                            />
                                        )}
                                        {point.expense > 0 && (
                                            <path
                                                d={columnPath(center + BAR_GAP / 2, yOf(point.expense), barWidth, expenseHeight, BAR_RADIUS)}
                                                fill={chartColors.expense}
                                            />
                                        )}
                                    </BarGroup>

                                    {(showEveryLabel || index % 2 === 0) && (
                                        <text x={center} y={height - 6} textAnchor="middle" fontSize={10} fill={chartColors.textSecondary}>
                                            {point.label}
                                        </text>
                                    )}

                                    <HitArea
                                        x={MARGIN.left + slot * index}
                                        y={MARGIN.top}
                                        width={slot}
                                        height={plotHeight + MARGIN.bottom}
                                        tabIndex={0}
                                        role="img"
                                        aria-label={`${formatMonthYear(point.month)}: receitas ${formatMoney(point.income)}, despesas ${formatMoney(point.expense)}`}
                                        onPointerEnter={() => setActiveIndex(index)}
                                        onPointerMove={() => setActiveIndex(index)}
                                        onPointerLeave={() => setActiveIndex(null)}
                                        onFocus={() => setActiveIndex(index)}
                                        onBlur={() => setActiveIndex(null)}
                                    />
                                </g>
                            );
                        })}

                        {peak.index >= 0 && (
                            <text
                                x={Math.min(Math.max(centerOf(peak.index), MARGIN.left + 14), MARGIN.left + plotWidth - 14)}
                                y={yOf(peak.value) - 5}
                                textAnchor="middle"
                                fontSize={10}
                                fontWeight={600}
                                fill={chartColors.textPrimary}
                            >
                                {formatCompact(peak.value)}
                            </text>
                        )}
                    </svg>
                )}

                {active && (
                    <Tooltip style={{ left: Math.min(Math.max(centerOf(activeIndex ?? 0), TOOLTIP_HALF_WIDTH), Math.max(TOOLTIP_HALF_WIDTH, width - TOOLTIP_HALF_WIDTH)) }}>
                        <TooltipTitle>{formatMonthYear(active.month)}</TooltipTitle>
                        <TooltipRow>
                            <span>
                                <TooltipKey $color={chartColors.income} />
                                Receitas
                            </span>
                            <TooltipValue>{formatMoney(active.income)}</TooltipValue>
                        </TooltipRow>
                        <TooltipRow>
                            <span>
                                <TooltipKey $color={chartColors.expense} />
                                Despesas
                            </span>
                            <TooltipValue>{formatMoney(active.expense)}</TooltipValue>
                        </TooltipRow>
                    </Tooltip>
                )}
            </Frame>
        </>
    );
}
