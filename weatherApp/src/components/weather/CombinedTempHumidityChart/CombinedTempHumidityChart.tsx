import { Card, Spin, Select } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";
import { format } from "date-fns";
import { Chart } from "react-chartjs-2";
import type { ChartOptions, ChartData, ChartDataset } from "chart.js";
import type { RootState } from "../../../store/store";
import { useTheme } from "../../../hooks/useTheme";
import type { ChartType } from "../../../types/chart.types";
import "../../../config/chartConfig";
import styles from "./CombinedTempHumidityChart.module.scss";

const { Option } = Select;

type DatasetType = ChartDataset<ChartType, number[]>;

export const CombinedTempHumidityChart = () => {
  const { themeMode } = useTheme();
  const { data, loading } = useSelector((state: RootState) => state.weather);
  const [chartType, setChartType] = useState<ChartType>("line");

  const datasets: DatasetType[] = [
    {
      type: chartType,
      label: "Температура (°C)",
      data: data.map((item) => item.temp),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0.4,
      yAxisID: "y-temp",
    },
    {
      type: chartType,
      label: "Влажность (%)",
      data: data.map((item) => item.humidity),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      tension: 0.4,
      yAxisID: "y-humidity",
    },
  ];

  const chartData: ChartData<ChartType> = {
    labels: data.map((item) => format(new Date(item.dt), "dd.MM HH:mm")),
    datasets,
  };

  const options: ChartOptions<ChartType> = {
    responsive: true,
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
        text: "Температура и Влажность",
        color: themeMode === "dark" ? "#fff" : "#000",
      },
    },
    scales: {
      "y-temp": {
        type: "linear",
        display: true,
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
        display: true,
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
  };

  const renderChart = () => {
    if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      );
    }

    return <Chart type={chartType} options={options} data={chartData} />;
  };

  return (
    <Card className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <Select
          value={chartType}
          onChange={setChartType}
          className={styles.chartTypeSelect}
        >
          <Option value="line">Линейный</Option>
          <Option value="bar">Гистограмма</Option>
        </Select>
      </div>
      {renderChart()}
    </Card>
  );
};
