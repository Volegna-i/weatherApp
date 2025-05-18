import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import type { WeatherData } from "../../types/weather.types";
import { getCommonChartOptions } from "./chart.utils";
import { calculateMovingAverage } from "../../utils/chartUtils";
import "../../config/chartConfig";

interface TemperatureChartProps {
  data: WeatherData[];
  themeMode: "light" | "dark";
  movingAveragePeriod: number;
}

export const TemperatureChart = ({
  data,
  themeMode,
  movingAveragePeriod,
}: TemperatureChartProps) => {
  const temperatures = data.map((item) => item.temp);
  const movingAverage = calculateMovingAverage(
    temperatures,
    movingAveragePeriod
  );

  const chartData = {
    labels: data.map((item) => format(new Date(item.dt), "dd.MM HH:mm")),
    datasets: [
      {
        label: "Температура (°C)",
        data: temperatures,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
      {
        label: `Скользящая средняя (${movingAveragePeriod} точки)`,
        data: movingAverage,
        borderColor: "rgba(53, 162, 235, 0.8)",
        backgroundColor: "rgba(53, 162, 235, 0.1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return <Line options={getCommonChartOptions(themeMode)} data={chartData} />;
};