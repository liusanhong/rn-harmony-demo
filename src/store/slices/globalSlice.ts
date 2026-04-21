import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface GlobalState {
  loading: boolean;
  toastMsg: string | null;
}

const initialState: GlobalState = {
  loading: false,
  toastMsg: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setToastMsg(state, action: PayloadAction<string | null>) {
      state.toastMsg = action.payload;
    },
  },
});

export const {setLoading, setToastMsg} = globalSlice.actions;
export default globalSlice.reducer;
