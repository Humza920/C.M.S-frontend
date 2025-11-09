// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { api } from "../api";


// export const fetchDashboardData = createAsyncThunk(
//   "dashboard/fetchData",
//   async (_, { rejectWithValue }) => {
//     console.log("📡 fetchDashboardData() called...");

//     try {
//       const { data } = await api.get("/api/dashboard", { withCredentials: true });
//       console.log("✅ Dashboard API success:", data);
//       return data; 
//     } catch (err) {
//       console.log("❌ Dashboard API error:", err.response?.data || err.message);
//       return rejectWithValue(err.response?.data || "Failed to fetch dashboard data");
//     }
//   }
// );

// export const deleteIncomeExpense = createAsyncThunk(
//   "delete/income_expense",
//   async ({ id, show }, { rejectWithValue }) => {
//     console.log("📡 fetchDashboardData called..."); // 🔍 check thunk call

//     try {
//       await api.delete(`/api/${show}/${id}`, { withCredentials: true });
//       console.log("✅ Delete API success:");
//       return true;
//     } catch (err) {
//       console.log("❌ Delete API error:", err.response?.data || err.message);
//       return rejectWithValue(err.response?.data || "Failed to fetch dashboard data");
//     }
//   }
// );


// payload = data jo API ko bhejna hai
// export const add = createAsyncThunk(
//   "addincome/expense",
//   async ({ show, payload }, { rejectWithValue }) => {
//     console.log("📡 fetchDashboardData() called...", show, payload);

//     try {
//       const { data } = await api.post(`/api/${show}/add`, payload, {
//         withCredentials: true
//       });

//       console.log("✅ add success:", data);
//       return data;
//     } catch (err) {
//       console.log("❌ add success:", err.response?.data || err.message);
//       return rejectWithValue(err.response?.data || "Failed to fetch dashboard data");
//     }
//   }
// );



// const dashboardSlice = createSlice({
//   name: "dashboard",
//   initialState: {

//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDashboardData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchDashboardData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.income = action.payload.data.last30DaysIncomeTransactions;
//         state.expense = action.payload.data.last30DaysExpenseTransactions;
//         state.totalIncome = action.payload.data.totalIncome;
//         state.totalExpense = action.payload.data.totalExpense;
//         state.balance = action.payload.data.balance;
//       })
//       .addCase(fetchDashboardData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default dashboardSlice.reducer;




// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { api } from "../api";


// // --- Async thunk for fetching dashboard data ---
// // export const fetchDashboardData = createAsyncThunk(
// //   "dashboard/fetchDashboardData",
// //   async (_, thunkAPI) => {
// //     try {
// //       const { data } = await api.get("/api/dashboard", { withCredentials: true });
// //       console.log(data.data);

// //       return data.data; // all nested dashboard info
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue(
// //         error.response?.data?.message || "Failed to fetch dashboard data"
// //       );
// //     }
// //   }
// // );

// // --- Initial state ---
// const initialState = {
//   doctors: [],
//   patients: [],
//   appointments: [],
//   doctorAppointments: {},
//   caseHistory: {},
//   loading: false,
//   error: null,
// };

// // --- Slice ---
// const dashboardSlice = createSlice({
//   name: "dashboard",
//   initialState,
//   reducers: {
//     resetDashboard: (state) => {
//       state.doctors = [];
//       state.patients = [];
//       state.appointments = [];
//       state.doctorAppointments = {};
//       state.caseHistory = {};
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   // extraReducers: (builder) => {
//   //   builder
//   //     .addCase(fetchDashboardData.pending, (state) => {
//   //       state.loading = true;
//   //       state.error = null;
//   //     })
//   //     .addCase(fetchDashboardData.fulfilled, (state, action) => {
//   //       state.loading = false;
//   //       state.doctors = action.payload.doctors;
//   //       state.patients = action.payload.patients;
//   //       state.appointments = action.payload.appointments;
//   //       state.doctorAppointments = action.payload.doctorAppointments;
//   //       state.caseHistory = action.payload.caseHistory;
//   //     })
//   //     .addCase(fetchDashboardData.rejected, (state, action) => {
//   //       state.loading = false;
//   //       state.error = action.payload || "Failed to fetch dashboard data";
//   //     });
//   // },
// });

// export const { resetDashboard } = dashboardSlice.actions;
// export default dashboardSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";

// ... existing imports and other async thunks ...

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

      // --- Fetch Doctor Appointments ---
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorAppointments = action.payload; // store doctor appointments
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
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
      });
  },
});

export const { clearMessages } = dashboardSlice.actions;
export default dashboardSlice.reducer;
