import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import {
  KPI,
  InsightSummary,
  CategoryDistribution,
  ResponseTimes,
  UserSatisfaction,
  UsageStatistics,
} from "./types";

interface kpiState {
  insight_summary: InsightSummary[];
  category_distribution: CategoryDistribution[];
  response_times: ResponseTimes[];
  user_satisfaction: UserSatisfaction[];
  usage_statistics: UsageStatistics[];
}
const initialState: kpiState = {
  insight_summary: [],
  category_distribution: [],
  response_times: [],
  usage_statistics: [],
  user_satisfaction: [],
};

export const kpiSlice = createSlice({
  name: "kpis",

  initialState,
  reducers: {
    addToStore: (state, action: PayloadAction<KPI>) => {
      console.log(action.payload);
      state.usage_statistics.push(action.payload.usage_statistics);
      state.user_satisfaction.push(action.payload.user_satisfaction);
      state.category_distribution.push(action.payload.category_distribution);
      state.response_times.push(action.payload.response_times);
    },
  },
});

export const { addToStore } = kpiSlice.actions;

// export const selectInsights = (state: RootState) => state.counter.insight_summary;

export default kpiSlice.reducer;
