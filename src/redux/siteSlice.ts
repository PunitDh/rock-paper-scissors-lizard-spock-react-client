import { createSlice } from "@reduxjs/toolkit";

export const siteSlice = createSlice({
  name: "site",
  initialState: {
    siteSettings: {},
  },
  reducers: {
    setSiteSettings: (state, action) => {
      state.siteSettings = action.payload.siteSettings;
    },
  },
});

export const { setSiteSettings } = siteSlice.actions;

export default siteSlice.reducer;
