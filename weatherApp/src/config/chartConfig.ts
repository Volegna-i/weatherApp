import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import type { ChartType } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController, // Добавляем контроллер для линейного графика
  BarElement,
  BarController, // Добавляем контроллер для столбчатого графика
  Title,
  Tooltip,
  Legend,
  Filler
);

ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;

declare module "chart.js" {
  interface ChartTypeRegistry {
    derivedBarLine: ChartType;
  }
}
