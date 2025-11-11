import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

// --- Fetch Logged-in Patient's Case Histories ---
export const fetchMyCaseHistories = createAsyncThunk(
  "caseHistory/fetchMyCaseHistories",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/api/dashboard/casehistory", {
        withCredentials: true,
      });
      console.log(data.caseHistories);
      
      return data.caseHistories || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch case histories"
      );
    }
  }
);

const initialState = {
  loading: false,
  caseHistories: [],
  error: null,
  success: null,
};

const caseHistorySlice = createSlice({
  name: "caseHistory",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch My Case Histories ---
      .addCase(fetchMyCaseHistories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyCaseHistories.fulfilled, (state, action) => {
        state.loading = false;
        state.caseHistories = action.payload;
      })
      .addCase(fetchMyCaseHistories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = caseHistorySlice.actions;
export default caseHistorySlice.reducer;
