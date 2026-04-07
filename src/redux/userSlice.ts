import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getUserProfile } from "@/services/profile";

// ✅ API response type (backend structure)
interface UserProfileAPI {
  id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  country: string;
  profile_pic: string;
}

// ✅ Frontend type (normalized)
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  country: string;
  profilePic: string;
}

// ✅ Redux state type
interface UserState {
  profile: UserProfile | null;
  loading: boolean;
}

// ✅ IMPORTANT: use typed initialState
const initialState: UserState = {
  profile: null,
  loading: false,
};

// ✅ Async thunk with typing
export const fetchUserProfile = createAsyncThunk<UserProfileAPI>(
  "user/fetchProfile",
  async () => {
    const res = await getUserProfile();
    return res;
  },
);

const userSlice = createSlice({
  name: "user",
  initialState, // ✅ FIXED (you were not using this earlier)
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile | null>) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const data = action.payload;

        // ✅ Normalize API → UI
        state.profile = {
          id: data.id,
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          address: data.address,
          city: data.city,
          state: data.state,
          country: data.country,
          profilePic: data.profile_pic,
        };

        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setProfile } = userSlice.actions;
export default userSlice.reducer;
