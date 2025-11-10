import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

// --- Fetch Dashboard Data ---
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/api/dashboard", { withCredentials: true });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard data"
      );
    }
  }
);

// --- Fetch All Doctors ---
export const fetchDoctorsAll = createAsyncThunk(
  "dashboard/fetchDoctorsAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/api/dashboard/doctors", { withCredentials: true });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch doctors data"
      );
    }
  }
);

// --- Fetch Available Slots ---
export const fetchAvailableSlots = createAsyncThunk(
  "dashboard/fetchAvailableSlots",
  async ({ doctorId, range }, thunkAPI) => {
    try {
      const { data } = await api.get(
        `/api/appointment/getAvailableSlots/${doctorId}?range=${range}`,
        { withCredentials: true }
      );
      return Array.isArray(data.slots) ? data.slots : data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch available slots"
      );
    }
  }
);

// --- Initial State ---
const initialState = {
  doctors: [],
  patients: [],
  slots: [],
  appointments: [],
  doctorAppointments: {},
  loading: false,
  error: null,
  success: null,
};

// --- Slice ---
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch Dashboard Data ---
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload.doctors || [];
        state.patients = action.payload.patients || [];
        state.appointments = action.payload.appointments || [];
        state.doctorAppointments = action.payload.doctorAppointments || {};
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Fetch Doctors ---
      .addCase(fetchDoctorsAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsAll.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctorsAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Fetch Available Slots ---
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = action.payload;
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = dashboardSlice.actions;
export default dashboardSlice.reducer;
