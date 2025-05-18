import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import type { WeatherData } from "../../types/weather.types";
import { getCommonChartOptions } from "./chart.utils";
import "../../config/chartConfig";
import type { ChartOptions } from "chart.js";

interface HumidityChartProps {
  data: WeatherData[];
  themeMode: "light" | "dark";
}

export const HumidityChart = ({ data, themeMode }: HumidityChartProps) => {
  const chartData = {
    labels: data.map((item) => format(new Date(item.dt), "dd.MM HH:mm")),
    datasets: [
      {
        label: "Влажность (%)",
        data: data.map((item) => item.humidity),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.4,
        yAxisID: "y-humidity",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    ...getCommonChartOptions(themeMode),
    scales: {
      "y-humidity": {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "Влажность (%)",
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
        type: "category" as const,
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
  };

  return <Line options={options} data={chartData} />;
};
