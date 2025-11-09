import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

// ... existing imports and other async thunks ...
// ... rest of your existing slice code ...

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
  caseHistory: {},
  loading: false,
  error: null,
  success: null,
};

// --- Slice ---
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



     

      // --- Book Appointment ---
      // .addCase(bookAppointment.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      //   state.success = null;
      // })
      // .addCase(bookAppointment.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.success = "Appointment booked successfully!";
      //   state.appointments.push(action.payload);
      // })
      // .addCase(bookAppointment.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })

      // --- Fetch My Appointments (Patient) ---
      // .addCase(fetchMyAppointments.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchMyAppointments.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.appointments = action.payload;
      // })
      // .addCase(fetchMyAppointments.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // });
  },
});

export const { clearMessages } = dashboardSlice.actions;
export default dashboardSlice.reducer;
