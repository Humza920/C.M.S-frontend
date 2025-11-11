import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

// --- Cancel Appointment ---
export const cancelAppointment = createAsyncThunk(
  "dashboard/cancelAppointment",
  async (appointmentId, thunkAPI) => {
    try {
      const { data } = await api.delete(`/api/appointment/${appointmentId}`, {
        withCredentials: true,
      });
      return data.appointment || appointmentId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to cancel appointment"
      );
    }
  }
);

// --- Fetch My Appointments ---
export const fetchMyAppointments = createAsyncThunk(
  "dashboard/fetchMyAppointments",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get(
        "/api/patient/myapp",
        {},
        { withCredentials: true }
      );
      return data.appointments;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch your appointments"
      );
    }
  }
);

// --- Book Appointment ---
export const bookAppointment = createAsyncThunk(
  "dashboard/bookAppointment",
  async ({ doctorId, date, time, day }, thunkAPI) => {
    try {
      const [startAt, endAt] = time.split(" - ");
      const { data } = await api.post(
        `/api/appointment/bookAppointment/${doctorId}`,
        { doctorId, appointmentDate: date, startAt, endAt, day },
        { withCredentials: true }
      );
      return data.appointment;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to book appointment"
      );
    }
  }
);

// --- Fetch Doctor's Appointments ---
export const fetchDoctorAppointments = createAsyncThunk(
  "dashboard/fetchDoctorAppointments",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/api/doctor/mydocapp", {
        withCredentials: true,
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch doctor appointments"
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




export const updateAppointmentStatus = createAsyncThunk(
  "dashboard/updateAppointmentStatus",
  async ({ appointmentId, status, diagnosis, prescription, notes, followUpDate }, thunkAPI) => {
    try {
      const { data } = await api.patch(
        `/api/doctor/updateStatus/${appointmentId}`,
        { status, diagnosis, prescription, notes, followUpDate },
        { withCredentials: true }
      );
      return data.appointment;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update appointment status"
      );
    }
  }
);

const initialState = {
  loading: false,
  appointments: [],
  error: null,
  success: null,
  slots: [],
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Appointment booked successfully!";
        state.appointments.push(action.payload);
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

   
      .addCase(fetchMyAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchMyAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateAppointmentStatus.pending, (state) => {
        state.loading = true;
      })
.addCase(updateAppointmentStatus.fulfilled, (state, action) => {
  state.loading = false;
  state.success = `Appointment status updated to ${action.payload.status}!`;

  const index = state.appointments.findIndex(
    (a) => a._id === action.payload._id
  );


  if (index !== -1) {
    state.appointments[index].status = action.payload.status;
  }
})
.addCase(updateAppointmentStatus.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

      .addCase(fetchAvailableSlots.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.slots = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Appointment cancelled successfully!";
        const index = state.appointments.findIndex(
          (a) => a._id === action.payload._id || a._id === action.payload
        );
        if (index !== -1) {
          state.appointments[index].status = "Cancelled";
        }
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = appointmentSlice.actions;
export default appointmentSlice.reducer;
