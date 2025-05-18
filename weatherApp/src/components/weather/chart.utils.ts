import type { ChartOptions } from "chart.js";
import type { ChartType } from "../../types/chart.types";

interface ChartTheme {
  themeMode: "light" | "dark";
  visibleDatasets?: {
    temperature: boolean;
    humidity: boolean;
    movingAverage: boolean;
  };
}

export const getCommonChartOptions = (
  themeMode: "light" | "dark"
): ChartOptions<ChartType> => ({
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

export const getCombinedChartOptions = ({
  themeMode,
  visibleDatasets,
}: ChartTheme): ChartOptions<ChartType> => ({
  responsive: true,
  // maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: themeMode === "dark" ? "#fff" : "#000",
      },
    },
    title: {
      display: true,
      text: "Температура, влажность и скользящая средняя",
      color: themeMode === "dark" ? "#fff" : "#000",
    },
  },
  scales: {
    "y-temp": {
      type: "linear",
      display: visibleDatasets?.temperature || visibleDatasets?.movingAverage,
      position: "left",
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
    "y-humidity": {
      type: "linear",
      display: visibleDatasets?.humidity,
      position: "right",
      title: {
        display: true,
        text: "Влажность (%)",
        color: themeMode === "dark" ? "#fff" : "#000",
      },
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        color: themeMode === "dark" ? "#fff" : "#000",
      },
    },
    x: {
      type: "category",
      display: true,
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
