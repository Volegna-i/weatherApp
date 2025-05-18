import { Card, Spin, Select, Space, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { Chart as ReactChart } from "react-chartjs-2";
import type { ChartData, ChartDataset, Chart } from "chart.js";
import { useRef, useEffect } from "react";
import type { RootState } from "../../../store/store";
import { useTheme } from "../../../hooks/useTheme";
import type { ChartType } from "../../../types/chart.types";
import { calculateMovingAverage } from "../../../utils/chartUtils";
import { getCombinedChartOptions } from "../chart.utils";
import { getDatasets } from "../chart.datasets";
import {
  setChartType,
  setMovingAveragePeriod,
  toggleDatasetVisibility,
} from "../../../store/chartSlice";
import "../../../config/chartConfig";
import styles from "./CombinedChart.module.scss";

const { Option } = Select;

export const CombinedChart = () => {
  const chartRef = useRef<Chart<ChartType> | null>(null);
  const { themeMode } = useTheme();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: RootState) => state.weather);
  const { chartType, movingAveragePeriod, visibleDatasets } = useSelector(
    (state: RootState) => state.chart
  );

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const temperatures = data.map((item) => item.temp);
  const movingAverageData = calculateMovingAverage(
    temperatures,
    movingAveragePeriod
  );

  const allDatasets = getDatasets({
    data,
    chartType,
    movingAveragePeriod,
    movingAverageData,
  });

  const datasets: ChartDataset<ChartType, number[]>[] = [];
  if (visibleDatasets.temperature) datasets.push(allDatasets.temperature);
  if (visibleDatasets.movingAverage) datasets.push(allDatasets.movingAverage);
  if (visibleDatasets.humidity) datasets.push(allDatasets.humidity);

  const chartData: ChartData<ChartType> = {
    labels: data.map((item) => format(new Date(item.dt), "dd.MM HH:mm")),
    datasets,
  };

  const options = {
    ...getCombinedChartOptions({ themeMode, visibleDatasets }),
    maintainAspectRatio: false,
    responsive: true,
  };

  const renderChart = () => {
    if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div className={styles.chartWrapper}>
        <ReactChart
          ref={(ref) => {
            if (ref) {
              chartRef.current = ref;
            }
          }}
          type={chartType}
          options={options}
          data={chartData}
        />
      </div>
    );
  };

  return (
    <Card className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <Space direction="vertical">
          <Space>
            <Select
              value={chartType}
              onChange={(value) => dispatch(setChartType(value))}
              className={styles.chartTypeSelect}
            >
              <Option value="line">Линейный</Option>
              <Option value="bar">Гистограмма</Option>
            </Select>
            <Select
              value={movingAveragePeriod}
              onChange={(value) => dispatch(setMovingAveragePeriod(value))}
              className={styles.periodSelect}
            >
              <Option value={2}>MA(2)</Option>
              <Option value={3}>MA(3)</Option>
              <Option value={5}>MA(5)</Option>
              <Option value={7}>MA(7)</Option>
            </Select>
          </Space>
          <Space>
            <Checkbox
              checked={visibleDatasets.temperature}
              onChange={() => dispatch(toggleDatasetVisibility("temperature"))}
            >
              Температура
            </Checkbox>
            <Checkbox
              checked={visibleDatasets.humidity}
              onChange={() => dispatch(toggleDatasetVisibility("humidity"))}
            >
              Влажность
            </Checkbox>
            <Checkbox
              checked={visibleDatasets.movingAverage}
              onChange={() =>
                dispatch(toggleDatasetVisibility("movingAverage"))
              }
            >
              Скользящая средняя
            </Checkbox>
          </Space>
        </Space>
      </div>
      {renderChart()}
    </Card>
  );
};
