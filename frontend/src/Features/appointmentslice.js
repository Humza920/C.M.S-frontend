import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";


// --- Fetch My Appointments ---
export const fetchMyAppointments = createAsyncThunk(
  "dashboard/fetchMyAppointments",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/api/patient/myapp", {}, { withCredentials: true });
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
        {
          doctorId,
          appointmentDate: date,
          startAt,
          endAt,
          day,
        },
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
      const { data } = await api.get("/api/doctor/mydocapp", { withCredentials: true });
      console.log(data);
      
      return data.data; // assuming backend returns { success, data: [...appointments] }
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


// --- Add Appointment Notes (Complete with diagnosis) ---
export const addAppointmentNotes = createAsyncThunk(
  "dashboard/addAppointmentNotes",
  async ({ appointmentId, diagnosis, prescription, notes, followUpDate }, thunkAPI) => {
    try {
      const { data } = await api.patch(
        `/api/appointment/updateStatus/${appointmentId}`,
        { 
          status: "completed",
          diagnosis,
          prescription,
          notes,
          followUpDate 
        },
        { withCredentials: true }
      );
      return data.appointment;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add appointment notes"
      );
    }
  }
);

// --- Update Appointment Status (Checked-in) ---
export const updateAppointmentStatus = createAsyncThunk(
  "dashboard/updateAppointmentStatus",
  async ({ appointmentId, status }, thunkAPI) => {
    try {
      const { data } = await api.patch(
        `/api/appointment/updateStatus/${appointmentId}`,
        { status },
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
  slots : [] 
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
      // --- Book Appointment ---
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
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

      // --- Fetch My Appointments (Patient) ---
      .addCase(fetchMyAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchMyAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Fetch Doctor Appointments ---
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Add Appointment Notes ---
      .addCase(addAppointmentNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAppointmentNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Appointment notes added successfully!";
        const index = state.appointments.findIndex(a => a._id === action.payload._id);
        if (index !== -1) state.appointments[index] = action.payload;
      })
      .addCase(addAppointmentNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Update Appointment Status ---
      .addCase(updateAppointmentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Appointment status updated!";
        const index = state.appointments.findIndex(a => a._id === action.payload._id);
        if (index !== -1) state.appointments[index] = action.payload;
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
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
        state.slots = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
  
});

export const { clearMessages } = appointmentSlice.actions;
export default appointmentSlice.reducer;
