import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserInfo {
  id?: number;
  phone?: string;
  name?: string;
  avatar?: string;
  [key: string]: any;
}

interface UserState {
  token: string | null;
  userInfo: UserInfo | null;
}

const initialState: UserState = {
  token: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setUserInfo(state, action: PayloadAction<UserInfo | null>) {
      state.userInfo = action.payload;
    },
    logout(state) {
      state.token = null;
      state.userInfo = null;
    },
  },
});

export const {setToken, setUserInfo, logout} = userSlice.actions;
export default userSlice.reducer;
