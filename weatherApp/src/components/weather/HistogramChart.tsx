import { Chart } from "react-chartjs-2";
import { format } from "date-fns";
import type { WeatherData } from "../../types/weather.types";
import { getCommonChartOptions } from "./chart.utils";
import { calculateMovingAverage } from "../../utils/chartUtils";
import "../../config/chartConfig";

interface HistogramChartProps {
  data: WeatherData[];
  themeMode: "light" | "dark";
  movingAveragePeriod: number;
}

export const HistogramChart = ({
  data,
  themeMode,
  movingAveragePeriod,
}: HistogramChartProps) => {
  const temperatures = data.map((item) => item.temp);
  const movingAverage = calculateMovingAverage(
    temperatures,
    movingAveragePeriod
  );

  const chartData = {
    labels: data.map((item) => format(new Date(item.dt), "dd.MM HH:mm")),
    datasets: [
      {
        type: "bar" as const,
        label: "Температура (°C)",
        data: temperatures,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 1,
      },
      {
        type: "line" as const,
        label: `Скользящая средняя (${movingAveragePeriod} точки)`,
        data: movingAverage,
        borderColor: "rgba(53, 162, 235, 0.8)",
        backgroundColor: "rgba(53, 162, 235, 0.1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return (
    <Chart
      type="bar"
      options={getCommonChartOptions(themeMode)}
      data={chartData}
    />
  );
};
