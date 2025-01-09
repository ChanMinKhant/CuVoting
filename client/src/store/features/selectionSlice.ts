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
  selections: SelectionState[] | [];
  filteredSelections: SelectionState[] | any;
  userVotedTitles: any[];
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
  reducers: {
    // remove userVotedTitles from the array payload is string.
    removeUserVotedTitles: (state, action) => {
      // console.log(action.payload);
      state.userVotedTitles = state.userVotedTitles.filter(
        (title) => title !== action.payload
      );
      console.log(state.userVotedTitles);
    },
    addUserVotedTitles: (state, action) => {
      state.userVotedTitles.push(action.payload);
    },
    filterSelections: (state, action) => {
      if (action.payload === 'couple') {
        const selections = state.selections;
      } else {
        state.filteredSelections = state.selections.filter(
          (selection) => selection === action.payload
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
      .addCase(fetchAllSelections.rejected, (state) => {
        state.status = 'failed';
        // state.error = action.payload as string;
      });
  },
});

export default selectionSlice.reducer;
export const { removeUserVotedTitles, addUserVotedTitles, filterSelections } =
  selectionSlice.actions;
