import { Card, Spin, Select, Space } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../../store/store";
import { useTheme } from "../../../hooks/useTheme";
import { ChartType } from "../../../types/chart.types";
import { TemperatureChart } from "../TemperatureChart/TemperatureChart";
import { HistogramChart } from "../HistogramChart";
import "../../../config/chartConfig";
import styles from "./CombinedChart.module.scss";

const { Option } = Select;

export const CombinedChart = () => {
  const { themeMode } = useTheme();
  const { data, loading } = useSelector((state: RootState) => state.weather);
  const [chartType, setChartType] = useState<ChartType>(ChartType.Line);
  const [movingAveragePeriod, setMovingAveragePeriod] = useState(3);

  const renderChart = () => {
    if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      );
    }

    return chartType === ChartType.Line ? (
      <TemperatureChart
        data={data}
        themeMode={themeMode}
        movingAveragePeriod={movingAveragePeriod}
      />
    ) : (
      <HistogramChart
        data={data}
        themeMode={themeMode}
        movingAveragePeriod={movingAveragePeriod}
      />
    );
  };

  return (
    <Card className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <Space>
          <Select
            value={chartType}
            onChange={setChartType}
            className={styles.chartTypeSelect}
          >
            <Option value={ChartType.Line}>Линейный</Option>
            <Option value={ChartType.Bar}>Гистограмма</Option>
          </Select>
          <Select
            value={movingAveragePeriod}
            onChange={setMovingAveragePeriod}
            className={styles.periodSelect}
          >
            <Option value={2}>MA(2)</Option>
            <Option value={3}>MA(3)</Option>
            <Option value={5}>MA(5)</Option>
            <Option value={7}>MA(7)</Option>
          </Select>
        </Space>
      </div>
      {renderChart()}
    </Card>
  );
};
