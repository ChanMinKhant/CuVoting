import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllSelections } from '../../services/selection';

// // Define a type for the slice state
// age
// :
// 22
// gender
// :
// "boy"
// height
// :
// 177
// name
// :
// "Min Thant"
// number
// :
// 10
// _id
// :
// "677a9214d29d4a878dd9cbd3"
interface SelectionState {
  age: number;
  gender: string;
  height: number;
  name: string;
  number: number;
  _id: string;
}

interface SelectionsState {
  selections: SelectionState[] | [];
  userVotedTitles: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SelectionsState = {
  selections: [],
  userVotedTitles: [],
  status: 'idle',
  error: null,
};

export const fetchAllSelections = createAsyncThunk(
  'selections/fetchAllSelections', // action name matches slice name
  async (_, { rejectWithValue }) => {
    try {
      console.log('fetching selections');
      const response = await getAllSelections();
      console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message); // Ensure error is a string
    }
  }
);

const selectionSlice = createSlice({
  name: 'selections', // Slice name should match the reducer key
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSelections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSelections.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selections = action.payload.data;
        state.userVotedTitles = action.payload.userVotedTitles;
      })
      .addCase(fetchAllSelections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default selectionSlice.reducer;
