import type { ChartType as ChartJSType } from "chart.js";

export type ChartType = Extract<ChartJSType, "line" | "bar">;

export const ChartTypeEnum = {
  Line: "line" as ChartType,
  Bar: "bar" as ChartType,
} as const;
