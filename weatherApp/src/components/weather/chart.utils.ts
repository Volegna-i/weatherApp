import type { ChartOptions } from "chart.js";

export const getCommonChartOptions = (
  themeMode: "light" | "dark"
): ChartOptions<"line" | "bar"> => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: themeMode === "dark" ? "#fff" : "#000",
      },
    },
    title: {
      display: true,
      text: "Изменение температуры",
      color: themeMode === "dark" ? "#fff" : "#000",
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Температура (°C)",
        color: themeMode === "dark" ? "#fff" : "#000",
      },
      grid: {
        color:
          themeMode === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
      },
      ticks: {
        color: themeMode === "dark" ? "#fff" : "#000",
      },
    },
    x: {
      grid: {
        color:
          themeMode === "dark"
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
      },
      ticks: {
        color: themeMode === "dark" ? "#fff" : "#000",
      },
    },
  },
});
