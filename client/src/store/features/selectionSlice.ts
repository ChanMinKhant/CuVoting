import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllSelections } from '../../services/selection';

interface SelectionState {
  age: number;
  gender: string;
  height: number;
  name: string;
  number: number;
  _id: string;
}

interface SelectionsState {
  selections: SelectionState[];
  filteredSelections: SelectionState[];
  userVotedTitles: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SelectionsState = {
  selections: [],
  filteredSelections: [],
  userVotedTitles: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch all selections
export const fetchAllSelections = createAsyncThunk(
  'selections/fetchAllSelections',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllSelections(); // Ensure this returns the correct structure
      if (!response || !response.data || !response.userVotedTitles) {
        throw new Error('Invalid response structure');
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'An unknown error occurred');
    }
  }
);

const selectionSlice = createSlice({
  name: 'selections',
  initialState,
  reducers: {
    // Remove a title from the userVotedTitles array
    removeUserVotedTitles: (state, action) => {
      state.userVotedTitles = state.userVotedTitles.filter(
        (title) => title !== action.payload
      );
    },
    // Add a title to the userVotedTitles array
    addUserVotedTitles: (state, action) => {
      state.userVotedTitles.push(action.payload);
    },
    // Filter selections based on the payload
    filterSelections: (state, action) => {
      if (action.payload === 'couple') {
        state.filteredSelections = state.selections.filter(
          (selection) => selection.gender === 'couple'
        );
      } else {
        state.filteredSelections = state.selections.filter(
          (selection) => selection._id === action.payload
        );
      }
    },
  },
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
        state.error = action.payload as string; // Ensure this is a string
      });
  },
});

// Export actions and reducer
export const { removeUserVotedTitles, addUserVotedTitles, filterSelections } =
  selectionSlice.actions;
export default selectionSlice.reducer;
