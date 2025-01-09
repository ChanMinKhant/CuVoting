import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  activeTab: 'boy' | 'girl' | 'couple';
  selectionId: string | null;
  name: string | null;
}

const initialState: ModalState = {
  isOpen: false,
  activeTab: 'boy',
  selectionId: null,
  name: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ activeTab: string; selectionId: string }>
    ) => {
      state.isOpen = true;
      //   state.activeTab = action.payload.activeTab;
      state.selectionId = action.payload.selectionId;
    },
    closeModal: (state) => {
      state.isOpen = false;
      //   state.activeTab = null;
      state.selectionId = null;
    },
    // active tag
    changeActiveTab: (
      state,
      action: PayloadAction<'boy' | 'girl' | 'couple'>
    ) => {
      state.activeTab = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { openModal, closeModal, changeActiveTab, setName } =
  modalSlice.actions;
export default modalSlice.reducer;
