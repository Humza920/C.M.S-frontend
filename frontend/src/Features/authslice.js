import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";


export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/auth/login", credentials, {
        withCredentials: true,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/auth/register", credentials, {
        withCredentials: true,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/api/auth/logout", {}, { withCredentials: true });
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/auth/getMe", { withCredentials: true });
      console.log(data.data);
      
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Not authenticated");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/auth/updnCompProfile", profileData, {
        withCredentials: true,
      });
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update profile");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    role:null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 🔹 REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false       
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null
       
      })
      // 🔹 LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;

      })
      .addCase(logout.rejected, (_, action) => {
      })
      // 🔹 CHECK AUTH
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.role = null
        state.user = null
      })

.addCase(checkAuth.fulfilled, (state, action) => {
  state.loading = false;
  const data = action.payload.data;

  state.user = data;

  // Check if userId exists (for patient/doctor)
  if (data.userId && data.userId.role) {
    state.role = data.userId.role;
  } 
  // Else directly use role from data (for staff/admin etc.)
  else if (data.role) {
    state.role = data.role;
  } 
  else {
    state.role = null; // fallback if no role found
  }
})

      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
