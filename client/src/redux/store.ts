import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer from '../store/features/userSlice';
import selectionReducer from '../store/features/selectionSlice'; // Import the selection reducer

const store = configureStore({
  reducer: {
    user: userReducer,
    selections: selectionReducer, // Changed from 'selection' to 'selections'
  },
  // ...existing code...
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
