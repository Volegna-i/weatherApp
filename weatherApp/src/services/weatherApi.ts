import axios from "axios";
import type { WeatherData } from "../types/weather.types";

interface WeatherApiResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
  }>;
}

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const MOSCOW_LAT = 55.7558;
const MOSCOW_LON = 37.6173;

export const getWeatherData = async (days: number): Promise<WeatherData[]> => {
  try {
    const cnt = Math.min(Math.ceil(days * 8), 40);

    console.log("Requesting weather data with params:", {
      lat: MOSCOW_LAT,
      lon: MOSCOW_LON,
      units: "metric",
      cnt,
      // Не выводим API_KEY в консоль для безопасности
    });

    const response = await axios.get<WeatherApiResponse>(
      `${BASE_URL}/forecast`,
      {
        params: {
          lat: MOSCOW_LAT,
          lon: MOSCOW_LON,
          appid: API_KEY,
          units: "metric",
          cnt,
        },
      }
    );

    console.log("API Response:", response.data); // Посмотрим что приходит

    const mappedData = response.data.list.map((item) => ({
      dt: item.dt * 1000,
      temp: Math.round(item.main.temp * 10) / 10,
      humidity: item.main.humidity,
    }));

    console.log("Mapped data:", mappedData); // Проверим преобразованные данные

    return mappedData;
  } catch (err) {
    console.error("Weather API Error:", err); // Детальный лог ошибки
    throw new Error(
      err instanceof Error ? err.message : "Ошибка запроса погодных данных"
    );
  }
};
