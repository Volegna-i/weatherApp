import type { ChartDataset } from "chart.js";
import type { WeatherData } from "../../types/weather.types";
import type { ChartType } from "../../types/chart.types";

type DatasetType = ChartDataset<ChartType, number[]>;

interface DatasetConfig {
  data: WeatherData[];
  chartType: ChartType;
  movingAveragePeriod: number;
  movingAverageData: number[];
}

export const getDatasets = ({
  data,
  chartType,
  movingAveragePeriod,
  movingAverageData,
}: DatasetConfig): {
  temperature: DatasetType;
  humidity: DatasetType;
  movingAverage: DatasetType;
} => ({
  temperature: {
    type: chartType,
    label: "Температура (°C)",
    data: data.map((item) => item.temp),
    borderColor: "rgb(255, 99, 132)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
    tension: 0.4,
    yAxisID: "y-temp",
  },
  movingAverage: {
    type: "line" as ChartType,
    label: `Скользящая средняя (${movingAveragePeriod} точки)`,
    data: movingAverageData,
    borderColor: "rgba(75, 192, 192, 0.8)",
    backgroundColor: "rgba(75, 192, 192, 0.1)",
    borderWidth: 2,
    tension: 0.4,
    yAxisID: "y-temp",
  },
  humidity: {
    type: chartType,
    label: "Влажность (%)",
    data: data.map((item) => item.humidity),
    borderColor: "rgb(53, 162, 235)",
    backgroundColor: "rgba(53, 162, 235, 0.5)",
    tension: 0.4,
    yAxisID: "y-humidity",
  },
});
