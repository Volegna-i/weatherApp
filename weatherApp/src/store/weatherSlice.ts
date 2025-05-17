import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getWeatherData } from "../services/weatherApi";
import type { WeatherData, WeatherState } from "../types/weather.types";

const initialState: WeatherState = {
  data: [],
  loading: false,
  error: null,
  selectedPeriod: 5,
};

export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (days: number) => {
    try {
      const data = await getWeatherData(days);
      const pointsNeeded = days * 8;

      return data.slice(0, pointsNeeded).sort((a, b) => a.dt - b.dt);
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Ошибка при загрузке данных о погоде"
      );
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSelectedPeriod: (state, action: PayloadAction<number>) => {
      state.selectedPeriod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWeatherData.fulfilled,
        (state, action: PayloadAction<WeatherData[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ||
          "Произошла ошибка при загрузке данных о погоде";
      });
  },
});

export const { setSelectedPeriod } = weatherSlice.actions;
export default weatherSlice.reducer;
