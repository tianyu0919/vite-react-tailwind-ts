import { createAction, createReducer } from '@reduxjs/toolkit';

const increment = createAction<number>('actionCounter/increment');
const decrement = createAction<number>('actionCounter/decrement');

const actionCounter = createReducer(0, builder => {
  builder.addCase(increment, (state, action) => state + action.payload);
  builder.addCase(decrement, (state, action) => state - action.payload);
})

export { increment, decrement };

export default actionCounter;