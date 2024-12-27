import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
  password: '',
  class: null,
  semester: null,
  major: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.class = action.payload.class;
      state.semester = action.payload.semester;
      state.major = action.payload.major;
    },
    login: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { register, login } = userSlice.actions;
export default userSlice.reducer;
