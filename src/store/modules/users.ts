/*
 * @Author: 卢天宇
 * @Date: 2023-09-12 06:55:19
 * @Description: 
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface userSliceProps {
  loading: boolean;
  error: null | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

const initialState: userSliceProps = {
  loading: false,
  error: null,
  data: null,
}

//* createAsyncThunk 是已经内置好的React-Thunk，有三个状态，分别是pending, fulfilled, rejected，成功和失败，都会从action返回结果。成功的会action.payload就是结果，失败的是action.error就是结果。
export const fetchData = createAsyncThunk('user/getUserData', async () => {
  console.log('Fetching data starting...');
  const response = await axios.get('https://randomuser.me/api/1');
  console.log('Fetching data Response', response);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // console.log('fetchData');
    // console.log(fetchData);
    // console.log(fetchData.name, fetchData.pending)
    builder.addCase(fetchData.pending, (state, action) => {
      console.log(action);
      state.loading = true;
      state.error = null;
    })
      .addCase(fetchData.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.data = null;
        state.error = action.error.message || null;
      })
  }
})

export default userSlice.reducer;