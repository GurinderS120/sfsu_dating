import type { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserReducerValues {
  user: { uid: string; email: string | null } | null;
}

const initialState: UserReducerValues = {
  user: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUserIn: (state, action: PayloadAction<UserReducerValues>) => {
      state.user = action.payload.user;
    },
    signUserOut: (state) => {
      state.user = null;
    },
  },
});

export const { signUserIn, signUserOut } = UserSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user;

export default UserSlice.reducer;
