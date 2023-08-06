import { createSlice } from "@reduxjs/toolkit";
interface GlobalState {
  mode: "dark" | "light";
  userId: string;
}

const initialState: GlobalState = {
  mode: "dark",
  userId: "63701cc1f03239c72c00017f",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { toggleMode } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
