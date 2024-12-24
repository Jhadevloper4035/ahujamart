import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user : {
    name: '',
    email: '',
    token: '',
    role: '',
    _id: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
    
  },
});




export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
