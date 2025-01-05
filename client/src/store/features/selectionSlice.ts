import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllSelections } from '../../services/selection';

interface SelectionState {
  selections: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SelectionState = {
  selections: [],
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
        state.selections = action.payload;
      })
      .addCase(fetchAllSelections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default selectionSlice.reducer;
