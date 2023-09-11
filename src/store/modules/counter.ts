/*
 * @Author: 卢天宇
 * @Date: 2023-09-11 23:27:45
 * @Description: 
 */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      console.log('xxx +++', state)
      state.value++
    },
    decrement(state) {
      console.log('xxx ---', state)
      state.value--
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      console.log('action', state, action);
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;