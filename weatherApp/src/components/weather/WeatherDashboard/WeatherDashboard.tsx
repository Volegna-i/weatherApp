import { useState, useEffect } from "react";
import { PeriodSelector } from "../../common/PeriodSelector/PeriodSelector";
import { TemperatureChart } from "../TemperatureChart/TemperatureChart";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { fetchWeatherData } from "../../../store/weatherSlice";
import styles from "./WeatherDashboard.module.scss";

export const WeatherDashboard = () => {
  const dispatch = useAppDispatch();
  const [selectedDays, setSelectedDays] = useState(5); // По умолчанию 5 дней

  useEffect(() => {
    dispatch(fetchWeatherData(selectedDays));
  }, [selectedDays, dispatch]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard_head}>
        <h1>Данные о погоде в Москве</h1>
        <PeriodSelector value={selectedDays} onChange={setSelectedDays} />
      </div>
      <TemperatureChart />
    </div>
  );
};
