import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ChartState {
  chartType: "line" | "bar";
  movingAveragePeriod: number;
  visibleDatasets: {
    temperature: boolean;
    humidity: boolean;
    movingAverage: boolean;
  };
}

const initialState: ChartState = {
  chartType: "line",
  movingAveragePeriod: 3,
  visibleDatasets: {
    temperature: true,
    humidity: false,
    movingAverage: false,
  },
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setChartType: (state, action: PayloadAction<"line" | "bar">) => {
      state.chartType = action.payload;
    },
    setMovingAveragePeriod: (state, action: PayloadAction<number>) => {
      state.movingAveragePeriod = action.payload;
    },
    toggleDatasetVisibility: (
      state,
      action: PayloadAction<"temperature" | "humidity" | "movingAverage">
    ) => {
      state.visibleDatasets[action.payload] =
        !state.visibleDatasets[action.payload];
    },
  },
});

export const { setChartType, setMovingAveragePeriod, toggleDatasetVisibility } =
  chartSlice.actions;
export default chartSlice.reducer;
