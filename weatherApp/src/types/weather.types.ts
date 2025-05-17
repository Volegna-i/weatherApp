export interface WeatherData {
  dt: number;
  temp: number;
  humidity: number;
}

export interface WeatherState {
  data: WeatherData[];
  loading: boolean;
  error: string | null;
  selectedPeriod: number;
}
