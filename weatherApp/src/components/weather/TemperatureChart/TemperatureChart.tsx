import { Line } from "react-chartjs-2";
import { Card, Spin } from "antd";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format } from "date-fns";
import type { RootState } from "../../../store/store";
import { useTheme } from "../../../hooks/useTheme";
import styles from "./TemperatureChart.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const TemperatureChart = () => {
  const { themeMode } = useTheme();
  const { data, loading } = useSelector((state: RootState) => state.weather);

  const chartData = {
    // Форматируем дату для отображения на графике
    labels: data.map((item) => format(new Date(item.dt), "dd.MM HH:mm")),
    datasets: [
      {
        label: "Температура (°C)",
        data: data.map((item) => item.temp),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
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
  };

  return (
    <Card className={styles.chartCard}>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      ) : (
        <Line options={options} data={chartData} />
      )}
    </Card>
  );
};
